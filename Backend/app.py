import time
import flask
import json
import mariadb
from flask import jsonify, request
from flask_cors import CORS, cross_origin
from config import *
from datetime import date
from random import choice
from string import ascii_uppercase, digits

app = flask.Flask(__name__)
CORS(app, support_credentials=False)
app.config["DEBUG"] = True

configObj = Config()

# configuration used to connect to MariaDB
config = {
    'host': configObj.getHost(),
    'port': configObj.getPort(),
    'user': configObj.getUser(),
    'password': configObj.getPassword(),
    'database': configObj.getData()
}

def build_preflight_response():
    response = make_response()
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add('Access-Control-Allow-Headers', "*")
    response.headers.add('Access-Control-Allow-Methods', "*")
    return response
    
def build_actual_response(response):
    #response.headers.add("Access-Control-Allow-Origin", "*")
    return response

@app.route('/createaccount', methods = ['OPTIONS', 'POST'])
@cross_origin()
def createacccount():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try:
            jsonData = request.json
                        
            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["fullName"])
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])
            rowData.append(jsonData["homeAddress"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = ?" , (jsonData["email"],))
            userData = cur.fetchone()

            if userData is not None:
                conn.close()
                return build_actual_response(jsonify({
                    "Message" : "There already exists a user with this email!"
                })), 400
            else:
                cur.execute("INSERT INTO users (fullName, email, password, homeAddress) VALUES (?,?,?,?)", tuple(rowData))
                cur.execute("INSERT INTO CreditCard (email) VALUES (?)", (jsonData["email"],))
                conn.commit()
                conn.close()
                return build_actual_response(jsonify({
                "Message" : "You have successfully created an account!"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Creat account failed!"
            }
            print("ERROR MSG:",str(e))
            return body, 400    

@app.route('/userlogin', methods = ['OPTIONS','POST'])
@cross_origin()
def userlogin():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT * FROM avoidlist where email = ?", (jsonData["email"],))
            avoidData = cur.fetchone()

            if avoidData is not None:
                return build_actual_response(jsonify({
                "Error" : "Your account has been banned from any further use!"
            })) , 200

            cur.execute("SELECT * FROM users WHERE email = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()

            cur.execute("SELECT * FROM users WHERE email = ?",(jsonData["email"],))
            peopleData = cur.fetchone()

            cur.execute("SELECT * FROM complaintsFiled WHERE email = ?", (jsonData["email"],))
            complaintsMade = cur.fetchall()

            cur.execute("SELECT * FROM complaintsFiled WHERE offender = ?", (peopleData[1],))
            complaintsReceived = cur.fetchall()

            cur.execute("SELECT * FROM orders WHERE email = ?", (jsonData["email"],))
            purchaseData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["fullName"] = peopleData[1]
                response["loginData"]["homeAddress"] = peopleData[3]
                response["loginData"]["availableMoney"] = peopleData[5]

                purchaseList = []
                for purchase in purchaseData:
                    purchaseOBJ = {}
                    purchaseOBJ["id"] = purchase [0]
                    purchaseOBJ["totalPrice"] = purchase [3]
                    purchaseOBJ["tracking_info"] = purchase [5]
                    purchaseOBJ["delivery_company"] = purchase [6]
                    purchaseOBJ["items"] = purchase[4]
                    purchaseList.append(purchaseOBJ)
                response["loginData"]["purchaseHistory"] = purchaseList

                complaintsList = []
                for complaint in complaintsMade:
                    complaintOBJ = {}
                    complaintOBJ["complaint"] = complaint [2]
                    complaintOBJ["offender"] = complaint [3]
                    complaintsList.append(complaintOBJ)
                response["loginData"]["complaintsMade"] = complaintsList

                complaintList = []
                for complaint in complaintsReceived:
                    complaintOBJ = {}
                    complaintOBJ["complainer"] = complaint[1]
                    complaintOBJ["complaint"] = complaint [2]
                    complaintList.append(complaintOBJ)
                response["loginData"]["complaintsReceived"] = complaintList

                conn.close()
                return build_actual_response(jsonify(response)), 200
            else:
                conn.close()
                raise Exception("Invalid username/password combination")
            
        except Exception as e:
            body = {
                'Error': "This username/password combination does not exist.",
                "verified": False
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/clerklogin', methods = ['OPTIONS','POST'])
@cross_origin()
def clerklogin():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM clerk WHERE email= ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()
            name = userData[2]

            cur.execute("SELECT * FROM clerk WHERE name = ?",(name,))
            peopleData = cur.fetchone()

            cur.execute("SELECT * FROM ComplaintsFiled WHERE offender = ?", (name,))
            complaintsData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["name"] = peopleData[2]
                response["loginData"]["email"] = peopleData[1]

                complaintsList = []
                for complaint in complaintsData:
                    complaintOBJ = {}
                    complaintOBJ["complainer"] = complaint[1]
                    complaintOBJ["complaint"] = complaint[2]
                    complaintsList.append(complaintOBJ)
                response["loginData"]["complaintsReceived"] = complaintsList

                # for complaint in complaintsData:
                #     complaintsList.append(complaint[1])
                # response["loginData"]["complaintsList"] = complaintsList

                conn.close()
                return build_actual_response(jsonify(response)), 200
            else:
                conn.close()
                raise Exception("Invalid name/password combination")
            
        except Exception as e:
            body = {
                'Error': "This name/password combination does not exist.",
                "verified": False
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/managerlogin', methods = ['OPTIONS','POST'])
@cross_origin()
def managerlogin():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM manager WHERE email = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()

            cur.execute("SELECT * FROM manager WHERE email = ?",(jsonData["email"],))
            peopleData = cur.fetchone()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["email"] = peopleData[1]
                response["loginData"]["name"] = peopleData[2]
                conn.close()
                return build_actual_response(jsonify(response)), 200
            else:
                conn.close()
                raise Exception("Invalid name/password combination")
            
        except Exception as e:
            body = {
                'Error': "This name/password combination does not exist.",
                "verified": False
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/deliverylogin', methods = ['OPTIONS','POST'])
@cross_origin()
def deliverylogin():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM deliverycompany WHERE email = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()
            name = userData[1]

            cur.execute("SELECT * FROM deliverycompany WHERE name = ?",(name,))
            peopleData = cur.fetchone()

            cur.execute("SELECT * FROM ComplaintsFiled WHERE offender = ?", (name,))
            complaintsData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["name"] = peopleData[1]
                complaintsList = []
                for complaint in complaintsData:
                    complaintsList.append(complaint[1])
                response["loginData"]["complaintsReceived"] = complaintsList
                conn.close()
                return build_actual_response(jsonify(response)), 200
            else:
                conn.close()
                raise Exception("Invalid name/password combination")
            
        except Exception as e:
            body = {
                'Error': "This name/password combination does not exist.",
                "verified": False
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/computercompanylogin', methods = ['OPTIONS','POST'])
@cross_origin()
def computercompanylogin():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM ComputerPartsCompany WHERE email = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()
            name = userData[1]

            cur.execute("SELECT * FROM ComputerPartsCompany WHERE name = ?",(name,))
            peopleData = cur.fetchone()

            cur.execute("SELECT * FROM ComplaintsFiled WHERE offender = ?", (name,))
            complaintsData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["name"] = peopleData[1]
                complaintsList = []
                for complaint in complaintsData:
                    complaintOBJ = {}
                    complaintOBJ["complaintId"] = complaint[0]
                    complaintOBJ["complainer"] = complaint[1]
                    complaintOBJ["complaint"] = complaint[2]
                    complaintOBJ["offender"] = complaint[3]
                    complaintsList.append(complaintOBJ)
                response["loginData"]["complaintsReceived"] = complaintsList
                conn.close()
                return build_actual_response(jsonify(response)), 200
            else:
                conn.close()
                raise Exception("Invalid name/password combination")
            
        except Exception as e:
            body = {
                'Error': "This name/password combination does not exist.",
                "verified": False
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/deliverycomplaints', methods = ['OPTIONS','GET'])
@cross_origin()
def deliverycomplaints():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        try: 
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            name = request.args.get('name')

            cur.execute("SELECT * FROM ComplaintsFiled WHERE offender = ?", (name,))
            complaintsData = cur.fetchall()

            response = {}
            response["deliveryData"] = {}
            response["deliveryData"]["name"] = name
            complaintsList = []
            for complaint in complaintsData:
                complaintOBJ = {}
                complaintOBJ["complainerId"] = complaint[0]
                complaintOBJ["complainer"] = complaint[1]
                complaintOBJ["complaint"] = complaint[2]
                complaintOBJ["offender"] = complaint[3]
                complaintsList.append(complaintOBJ)
            response["deliveryData"]["complaintsList"] = complaintsList
            conn.close()
            return build_actual_response(jsonify(response)), 200

            conn.close()
            raise Exception("Cannot view delivery account")
            
        except Exception as e:
            body = {
                'Error': "Cannot view delivery account",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/builddesktop', methods = ['OPTIONS','GET'])
@cross_origin()
def builddesktop():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        try: 
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            rowData = []
            rowData.append(request.args.get('operating_system'))
            rowData.append(request.args.get('main_purpose'))
            rowData.append(request.args.get('architecture'))
            rowData.append(request.args.get('type'))

            cur.execute("SELECT * FROM parts where operating_system = ? AND main_purpose = ? AND architecture = ? AND type = ? ", tuple(rowData))
            computerData = cur.fetchall()

            response = {}
            parts = []
            for part in computerData:
                partsOBJ = {}
                partsOBJ["itemId"] = part[0]
                partsOBJ["name"] = part[1]
                partsOBJ["imageBase64"] = part[3]
                partsOBJ["price"] = part[7]
                partsOBJ["voting"] = part[8]
                partsOBJ["discussion_id"] = part[9]
                if partsOBJ not in parts:
                    parts.append(partsOBJ)
            response["partsData"] = parts

            conn.close()

            return build_actual_response(jsonify(response))

        except Exception as e:
            body = {
                'Error': "This combination does not exist sorry!",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/choosecomputer', methods = ['OPTIONS','GET'])
@cross_origin()
def choosecomputer():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        try: 
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            rowData = []
            rowData.append(request.args.get('operating_system'))
            rowData.append(request.args.get('main_purpose'))
            rowData.append(request.args.get('architecture'))
            rowData.append(request.args.get('type'))

            cur.execute("SELECT * FROM computer where operating_system = ? AND main_purpose = ? AND architecture = ? AND type = ?", tuple(rowData))
            computerData = cur.fetchall()

            response = {}
            computers = []
            for computer in computerData:
                if computer[3] == 'Laptop':
                    computerOBJ = {}
                    computerOBJ["computerId"] = computer[0]
                    computerOBJ["name"] = computer[1].replace('"', "")
                    computerOBJ["imageBase64"] = computer[2]
                    computerOBJ["cpu"] = computer[7]
                    computerOBJ["memory"] = computer[8]
                    computerOBJ["harddrive"] = computer[9]
                    computerOBJ["gpu"] = computer[10]
                    computerOBJ["price"] = computer[14]
                    computerOBJ["voting"] = computer[15]
                    computerOBJ["discussion_id"] = computer[16]
                else:
                    computerOBJ = {}
                    computerOBJ["computerId"] = computer[0]
                    computerOBJ["name"] = computer[1].replace('"', "")
                    computerOBJ["imageBase64"] = computer[2]
                    computerOBJ["cpu"] = computer[7]
                    computerOBJ["memory"] = computer[8]
                    computerOBJ["harddrive"] = computer[9]
                    computerOBJ["gpu"] = computer[10]
                    computerOBJ["monitor"] = computer[11]
                    computerOBJ["keyboard"] = computer[12]
                    computerOBJ["mouse"] = computer[13]
                    computerOBJ["price"] = computer[14]
                    computerOBJ["voting"] = computer[15]
                    computerOBJ["discussion_id"] = computer[16]
                if computerOBJ not in computers:
                    computers.append(computerOBJ)
            response["computerData"] = computers
            conn.close()

            return build_actual_response(jsonify(response))

        except Exception as e:
            body = {
                'Error': "This combination does not exist sorry!",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/viewpartitem', methods = ['OPTIONS','GET'])
@cross_origin()
def viewpartitem():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        try: 
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            id = request.args.get('item_id')

            cur.execute("SELECT * FROM Parts where id = ? ", (id,))
            partData = cur.fetchone()

            cur.execute("SELECT avg(vote) from reviews where item_id = ? AND name = ?", (id,partData[1]))
            voteData = cur.fetchone()

            response = {}
            response["partData"] = {}
            response["partData"]["name"] = partData[1]
            response["partData"]["imageBase64"] = partData[3]
            response["partData"]["price"] = partData[7]
            response["partData"]["voting"] = 0 if voteData[0] is None else float(voteData[0])
            
            cur.execute("SELECT * from reviews where item_id = ?", (id,))
            discussionData = cur.fetchall()

            reviews = []
            for review in discussionData:
                reviewOBJ = {}
                reviewOBJ["commentId"] = review[0]
                reviewOBJ["commenter"] = review[3]
                reviewOBJ["comment"] = review[4]
                reviewOBJ["vote"] = review[5]
                reviews.append(reviewOBJ)
            response["partData"]["discussion"] = reviews

            conn.close()

            return build_actual_response(jsonify(response))

        except Exception as e:
            body = {
                'Error': "This item does not exist, sorry!",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/viewcomputeritem', methods = ['OPTIONS','GET'])
@cross_origin()
def viewcomputeritem():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "GET":
        try: 
            conn = mariadb.connect(**config)
            cur = conn.cursor()
            
            id = request.args.get('item_id')

            cur.execute("SELECT * FROM computer where id = ? ", (id,))
            computerData = cur.fetchone()

            cur.execute("SELECT avg(vote) from reviews where item_id = ? AND name = ?", (id,computerData[1].replace('"', "")))
            voteData = cur.fetchone()

            response = {}
            if computerData[3] == 'Laptop':
                response["computerData"] = {}
                response["computerData"]["computerId"] = computerData[0]
                response["computerData"]["name"] = computerData[1].replace('"', "")
                response["computerData"]["imageBase64"] = computerData[2]
                response["computerData"]["cpu"] = computerData[7]
                response["computerData"]["memory"] = computerData[8]
                response["computerData"]["harddrive"] = computerData[9]
                response["computerData"]["gpu"] = computerData[10]
                response["computerData"]["price"] = computerData[14]
                response["computerData"]["voting"] = 0 if voteData[0] is None else float(voteData[0])
            else:
                response["computerData"] = {}
                response["computerData"]["computerId"] = computerData[0]
                response["computerData"]["name"] = computerData[1].replace('"', "")
                response["computerData"]["imageBase64"] = computerData[2]
                response["computerData"]["cpu"] = computerData[7]
                response["computerData"]["memory"] = computerData[8]
                response["computerData"]["harddrive"] = computerData[9]
                response["computerData"]["gpu"] = computerData[10]
                response["computerData"]["monitor"] = computerData[11]
                response["computerData"]["keyboard"] = computerData[12]
                response["computerData"]["mouse"] = computerData[13]
                response["computerData"]["price"] = computerData[14]
                response["computerData"]["voting"] = 0 if voteData[0] is None else float(voteData[0])

            cur.execute("SELECT * from reviews where item_id = ?", (id,))
            discussionData = cur.fetchall()

            reviews = []
            for review in discussionData:
                reviewOBJ = {}
                reviewOBJ["commentId"] = review[0]
                reviewOBJ["commenter"] = review[3]
                reviewOBJ["comment"] = review[4]
                reviewOBJ["vote"] = review[5]
                reviews.append(reviewOBJ)
            response["computerData"]["discussion"] = reviews

            conn.close()

            return build_actual_response(jsonify(response))

        except Exception as e:
            body = {
                'Error': "This combination does not exist sorry!",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editname', methods = ['OPTIONS', 'POST'])
@cross_origin()
def editname():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["fullName"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET fullName = ? WHERE email = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit name!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editaddress', methods = ['OPTIONS', 'POST'])
@cross_origin()
def editaddress():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["homeAddress"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET  homeaddress = ? WHERE email = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit home address!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editpassword', methods = ['OPTIONS', 'POST'])
@cross_origin()
def editpassword():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["password"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET password = ? WHERE email = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit password!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editcreditcard', methods = ['OPTIONS', 'POST'])
@cross_origin()
def editcreditcard():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["name"])
            rowData.append(jsonData["number"])
            rowData.append(jsonData["cvc"])
            rowData.append(jsonData["expirationDate"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            
            today = date.today()
            d = today.strftime("%m/%y")
            
            if jsonData["expirationDate"] >= d:
                cur.execute("UPDATE CreditCard SET name = ? , number = ? ,cvc = ?, expirationDate = ? WHERE email = ?", tuple(rowData))
                conn.commit()
            else: 
                return build_actual_response(jsonify({
                    "Status" : "Card is not valid double check your information!"
                })), 400
                
            conn.close()
            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit credit card!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/editmoney', methods = ['OPTIONS', 'POST'])
@cross_origin()
def editmoney():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["availableMoney"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET availableMoney = ? WHERE email = ?", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't edit available money!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/deleteproduct', methods = ['OPTOINS', 'POST'])
@cross_origin()
def deleteproduct():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try: 
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["name"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("DELETE FROM cart WHERE name = ? AND email = ?", tuple(rowData))
            conn.commit()

            cur.execute("SELECT * FROM cart WHERE email = ?", (jsonData["email"],))
            cartData = cur.fetchall()

            response = {}
            products = []
            for part in cartData:
                productOBJ = {}
                productOBJ["name"] = part[1]
                productOBJ["imageBase64"] = part[2]
                productOBJ["price"] = part[3]
                if productOBJ not in products:
                    products.append(productOBJ)
            response["cartData"] = products

            conn.close()
            return build_actual_response(jsonify(response))
        except Exception as e:
            body = {
                'Error': "Can't delete product from cart!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/addtocart', methods = ['OPTIONS', 'POST'])
@cross_origin()
def addtocart():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try: 
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["email"])
            rowData.append(jsonData["name"])
            rowData.append(jsonData["price"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("INSERT INTO cart (email, name,price) VALUES (?,?,?)", tuple(rowData))
            conn.commit()
            conn.close()
            
            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't add product to cart!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/viewcart', methods = ['OPTIONS', 'GET'])
@cross_origin()
def viewcart():
     if request.method == 'OPTIONS':
         return build_preflight_response
     elif request.method == 'GET':
         try:
             conn = mariadb.connect(**config)
             cur = conn.cursor()

             email = request.args.get('email')
             cur.execute("SELECT * FROM cart WHERE email = ?",(email,))
             cartData = cur.fetchall()

             cur.execute("SELECT sum(price) from cart where email = ?",(email,))
             priceData = cur.fetchone()

             response = {}
             response["cartData"] = {}
             products = []
             for part in cartData:
                 productOBJ = {}
                 productOBJ["name"] = part[1]
                 productOBJ["price"] = part[3]
                 products.append(productOBJ)
             response["cartData"]["allProducts"] = products
             response["cartData"]["totalPrice"] = 0 if priceData[0] is None else float(priceData[0])

             conn.close()
             return build_actual_response(jsonify(response))

         except Exception as e:
             body = {
                 'Error': "Can't display cart.",
             }
             print("ERROR MSG:",str(e))
             return build_actual_response(jsonify(body)), 400

@app.route('/viewaccount', methods = ['OPTIONS', 'GET'])
@cross_origin()
def viewaccount():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            email = request.args.get('email')
            cur.execute("SELECT fullname,users.email,homeaddress, right(number,4), availablemoney FROM users JOIN creditcard on users.email = creditcard.email WHERE users.email = ?",(email,))
            userData = cur.fetchall()

            cur.execute("SELECT * FROM complaintsFiled WHERE email = ?", (email,))
            complaintsMade = cur.fetchall()

            cur.execute("SELECT * FROM complaintsFiled WHERE offender = ?", (userData[0][0],))
            complaintsReceived = cur.fetchall()

            cur.execute("SELECT * FROM reviews WHERE commenter = ?", (email,))
            votesData = cur.fetchall()

            cur.execute("SELECT * FROM orders WHERE email = ?", (email,))
            purchaseData = cur.fetchall()

            response = {}
            profiles = []
            complaintsList = []
            complaintList = []
            voteList = []

            for profile in userData:
                profileOBJ = {}
                profileOBJ["fullName"] = profile[0]
                profileOBJ["email"] = profile[1]
                profileOBJ["homeAddress"] = profile[2]
                profileOBJ["creditCard"] = profile[3]
                profileOBJ["availableMoney"] = profile[4]
                if profileOBJ not in profiles:
                    profiles.append(profileOBJ)
            response["userData"] = profiles

            for complaint in complaintsMade:
                complaintOBJ = {}
                complaintOBJ["complaint"] = complaint[2]
                complaintOBJ["offender"] = complaint[3]
                complaintsList.append(complaintOBJ)
            response["userData"][0]["complaintsMade"] = complaintsList

            for complaint in complaintsReceived:
                complaintOBJ = {}
                complaintOBJ["complainer"] = complaint[1]
                complaintOBJ["complaint"] = complaint[2]
                complaintList.append(complaintOBJ)
            response["userData"][0]["complaintsReceived"] = complaintList

            for vote in votesData:
                voteOBJ = {}
                voteOBJ["item_id"] = vote[1]
                voteOBJ["vote"] = vote[4]
                voteList.append(voteOBJ)
            response["userData"][0]["votesCasted"] = voteList
                
            purchaseList = []
            for purchase in purchaseData:
                purchaseOBJ = {}
                purchaseOBJ["id"] = purchase[0]
                purchaseOBJ["totalPrice"] = purchase[3]
                purchaseOBJ["tracking_info"] = purchase[6]
                purchaseOBJ["delivery_company"] = purchase[7]
                purchaseOBJ["items"] = purchase[4]
                purchaseList.append(purchaseOBJ)
            response["userData"][0]["purchaseHistory"] = purchaseList

            conn.close()
            return build_actual_response(jsonify(response))

        except Exception as e:
            body = {
                'Error': "Can't display user.",
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route ('/checkout', methods = ["OPTIONS", 'POST'])
@cross_origin()
def checkout():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["customerName"])
            rowData.append(jsonData["email"])
            rowData.append(jsonData["totalPrice"])
            rowData.append(jsonData["itemList"])
            rowData.append(jsonData["homeAddress"])
            rowData.append(jsonData["paymentMethod"])
            
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            if jsonData["paymentMethod"] == "money":
                cur.execute("SELECT availablemoney FROM Users WHERE email = ?", (jsonData["email"],))
                infoData = cur.fetchone()

                if infoData[0] >= jsonData["totalPrice"]:
                    money = infoData[0] - jsonData["totalPrice"]
                    cur.execute("UPDATE users SET availablemoney = ? WHERE email = ?", (money,jsonData["email"],))
                    conn.commit()

                    cur.execute("INSERT INTO Orders (customerName,email,totalPrice,itemList,homeAddress) VALUES (?,?,?,?,?)", tuple(rowData))
                    conn.commit()

                    cur.execute("DELETE FROM cart where email = ?", (jsonData["email"],))
                    conn.commit()
                else: 
                    return build_actual_response(jsonify({
                        "Message" : "You don't have enough money! You can either use another payment method or put more money into your account.",
                        "Error": "True"
                    }))
            else:
                cur.execute("INSERT INTO Orders (customerName,email, totalPrice, itemList, homeAddress) VALUES (?,?,?,?,?)", tuple(rowData))
                conn.commit()

                cur.execute("DELETE FROM cart where email = ?", (jsonData["email"],))
                conn.commit()
                
            conn.close()
            
            return build_actual_response(jsonify({
                "Message" : "You have successfully completed your order!"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't complete your order!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/getorders', methods = ['OPTIONS', 'GET'])
@cross_origin()
def getorders():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT * FROM orders")
            ordersData = cur.fetchall()

            response = {}
            orders = []
            for order in ordersData:
                orderOBJ = {}
                orderOBJ["orderId"] = order[0]
                orderOBJ["customerName"] = order[1]
                orderOBJ["totalPrice"] = order[3]
                orderOBJ["homeaddress"] = order[5]
                orderOBJ["tracking"] = order[6]
                orderOBJ["deliverycompany"] = order[7]
                orders.append(orderOBJ)
            response["ordersData"] = orders

            conn.close()
            return build_actual_response(jsonify(response))
        except Exception as e:
            body = {
                'Error': "Can't view orders!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/postcomplaint', methods = ['OPTIONS', 'POST'])
@cross_origin()
def postcomplaint():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["complainer"]) 
            rowData.append(jsonData["complaint"])  
            rowData.append(jsonData["offender"]) # email of offender
            rowData.append(jsonData["email"]) 

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("INSERT INTO ComplaintsFiled (complainer,complaint,offender,email) VALUES (?,?,?,?)", tuple(rowData))
            conn.commit()

            cur.execute("INSERT INTO warnings (email) VALUES (?)", (jsonData["offender"],))

            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can not post complaint!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/postdiscussion', methods = ['OPTIONS', 'POST'])
@cross_origin()
def postdiscussion():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["item_id"]) 
            rowData.append(jsonData["name"]) #item name 
            rowData.append(jsonData["commenter"]) #give me the users email please
            rowData.append(jsonData["comment"])
            rowData.append(jsonData["vote"])
            
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT word FROM taboolist")
            tabooData = cur.fetchall()

            for word in tabooData:
                word1 = ''.join(word)
                if word1 in rowData[3]:
                    badWord = "*"*len(word1)
                    rowData[3] = rowData[3].replace(word1,badWord)
                    cur.execute("INSERT INTO reviews (item_id,name,commenter,comment,vote) VALUES (?,?,?,?,?)", tuple(rowData))
                    cur.execute("INSERT INTO warnings (email) VALUES (?)", (jsonData["commenter"],))
                    conn.commit()

                    return build_actual_response(jsonify({
                        "Warning" : "You have been issued a warning for your use of an inappropriate word!"
                    })) , 200
            
            cur.execute("INSERT INTO Reviews (item_id,name,commenter,comment,vote) VALUES (?,?,?,?,?)", tuple(rowData))
            conn.commit()
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200

        except Exception as e:
            body = {
                'Error': "Can't post the comment!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route ('/getallcomplaints', methods = ['OPTIONS', 'GET'])
def gethashtags():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':       
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT * FROM ComplaintsFiled")
            complaints = cur.fetchall()

            cur.execute("SELECT * FROM Warnings")
            warnings = cur.fetchall()

            cur.execute("SELECT * FROM warnings")
            warningData = cur.fetchall()

            response = {}
            complaint = []
            response["managerData"] = {}
            for issue in complaints:
                issueOBJ = {}
                issueOBJ["id"] = issue[0]
                issueOBJ["complainer"] = issue[1]
                issueOBJ["complaint"] = issue[2]
                issueOBJ["offender"] = issue[3]
                issueOBJ["email"] = issue[4]
                issueOBJ["defense"] = issue[5]
                complaint.append(issueOBJ)
            response["managerData"]["complaintsData"] = complaint

            warnings = []
            for warning in warningData:
                warningOBJ = {}
                warningOBJ["id"] = warning[0]
                warningOBJ["email"] = warning[1]
                warningOBJ["reasoning"] = warning[2]
                warningOBJ["decision"] = warning[3]
                warnings.append(warningOBJ)
            response["managerData"]["warningsData"] = warnings

            conn.close()
            return build_actual_response(jsonify(response))
        except Exception as e:
            body = {
                'Error': "Can't view complaints!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/getbids', methods = ['OPTIONS', 'GET']) # For store clerk
@cross_origin()
def getbids():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT * FROM bids")
            bidsData = cur.fetchall()

            response = {}
            bids = []
            for bid in bidsData:
                bidOBJ = {}
                bidOBJ["bidId"] = bid[0]
                bidOBJ["deliverycompany"] = bid[1]
                bidOBJ["orderId"] = bid[2]
                bidOBJ["bidPrice"] = bid[3]
                bids.append(bidOBJ)
            response["bidsData"] = bids

            conn.close()
            return build_actual_response(jsonify(response))
        except Exception as e:
            body = {
                'Error': "Can't view bids!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/postbid', methods = ['OPTIONS', 'POST']) #for delivery company
@cross_origin()
def postbid():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try: 
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["deliverycompany"])
            rowData.append(jsonData["order_id"])
            rowData.append(jsonData["bidprice"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("INSERT INTO Bids (deliverycompany,order_id,bidprice) VALUES (?,?,?)", tuple(rowData))
            conn.commit()
            conn.close()
            
            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't place bid!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/writedefense', methods = ['OPTIONS', 'POST'])
@cross_origin()
def writedefense():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["defense"])
            rowData.append(jsonData["id"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE complaintsfiled SET defense = ? WHERE id = ? ", tuple(rowData))
            conn.commit()

            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't write defense!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/choosebid', methods = ['OPTIONS', 'POST'])
@cross_origin()
def choosebid():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["bidId"])
            rowData.append(jsonData["orderId"])
            rowData.append(jsonData["delivery_company"])
            rowData.append(jsonData["justification"])
            rowData.append(jsonData["email"]) # clerk email

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT id from bids WHERE bidprice = (SELECT min(bidprice) FROM bids)")
            priceData = cur.fetchone()
            price = priceData[0]

            cur.execute("UPDATE bids set justification = ? where id = ?", (jsonData["justification"], jsonData["bidId"],))
            conn.commit()

            cur.execute("SELECT justification from bids where id = ?", (jsonData["bidId"],))
            defenseData = cur.fetchone()
            defense = defenseData[0]

            if jsonData["bidId"] != price and not all(defenseData):
                cur.execute("INSERT INTO warnings (email) VALUES (?)", (jsonData["email"],))
                conn.commit()

                cur.execute("UPDATE Bids set bidstatus = '1' where id = ?", (jsonData["bidId"],))
                conn.commit()

                cur.execute("UPDATE orders set delivery_company = ? where id = ?", (jsonData["delivery_company"], jsonData["orderId"],))
                conn.commit()

                cur.execute("SELECT tracking_info FROM orders")
                trackingData = cur.fetchall()

                tracking = (''.join(choice(ascii_uppercase + digits) for i in range (15)))
                cur.execute("UPDATE orders set tracking_info = ? where id = ?", (tracking, jsonData["orderId"],))
                conn.commit()

                cur.execute("DELETE FROM bids where order_id = ?", (jsonData["orderId"],))
                conn.commit()
            else:
                cur.execute("UPDATE Bids set bidstatus = '1' where id = ?", (jsonData["bidId"],))
                conn.commit()

                cur.execute("UPDATE orders set delivery_company = ? where id = ?", (jsonData["delivery_company"], jsonData["orderId"],))
                conn.commit()

                cur.execute("SELECT tracking_info FROM orders")
                trackingData = cur.fetchall()

                tracking = (''.join(choice(ascii_uppercase + digits) for i in range (15)))
                cur.execute("UPDATE orders set tracking_info = ? where id = ?", (tracking, jsonData["orderId"],))
                conn.commit()

                cur.execute("DELETE FROM bids where order_id = ?", (jsonData["orderId"],))
                conn.commit()
            
            conn.close()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Can't choose bid!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/warnings', methods = ['OPTIONS','POST'])
@cross_origin()
def warnings():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["email"])
            rowData.append(jsonData["id"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE warnings set decision = 1 where id = ?", (jsonData["id"]))
            conn.commit()

            cur.execute("SELECT count(decision) from warnings where email = ? and decision = 1", (jsonData["email"],))
            warningData = cur.fetchone()
            warning = warningData[0]

            if warning == 3:
                cur.execute("INSERT INTO avoidlist (email) VALUES (?)", tuple(rowData))
                conn.commit()

            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Warning was not affected!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/avoidaccount', methods = ['OPTIONS','POST'])
@cross_origin()
def avoidaccount():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'POST':
        try:
            jsonData = request.json

            rowData = []
            rowData.append(jsonData["email"])
            rowData.append(jsonData["id"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("INSERT INTO avoidlist (email) VALUES (?)", tuple(rowData))
            conn.commit()

            conn.close()
            
            return build_actual_response(jsonify({
                "Status" : "1"
            })) , 200
        except Exception as e:
            body = {
                'Error': "Account was not put in avoid list!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

@app.route('/popular', methods = ['OPTIONS','GET'])
@cross_origin()
def popular():
    if request.method == 'OPTIONS':
        return build_preflight_response
    elif request.method == 'GET':
        try:
            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("SELECT computer.name,computer.price, computer.id,avg(vote) FROM computer join reviews on computer.id = reviews.item_id group by item_id order by avg(vote) DESC LIMIT 3")
            popularData = cur.fetchall()

            response = {}
            popular = []
            for order in popularData:
                orderOBJ = {}
                orderOBJ["name"] = order[0]
                orderOBJ["price"] = order [1]
                orderOBJ["id"] = order [2]
                popular.append(orderOBJ)
            response["popularData"] = popular

            conn.close()
            return build_actual_response(jsonify(response))
        except Exception as e:
            body = {
                'Error': "Can't view popular items!"
            }
            print("ERROR MSG:",str(e))
            return build_actual_response(jsonify(body)), 400

if __name__ == '__main__':
    app.run()