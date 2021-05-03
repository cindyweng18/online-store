import time
import flask
import json
import mariadb
from flask import jsonify, request
from flask_cors import CORS, cross_origin
from config import *

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
            rowData.append(jsonData["creditCard"])
            #rowData.append(jsonData["availableMoney"])
            rowData.append(jsonData["purchaseHistory"])


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
                cur.execute("INSERT INTO users (fullName, email, password, homeAddress, creditCard, purchaseHistory) VALUES (?,?,?,?,?,?)", tuple(rowData))
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

@app.route('/login', methods = ['OPTIONS','POST'])
@cross_origin()
def login():
    if request.method == "OPTIONS":
        return build_preflight_response
    elif request.method == "POST":
        try: 
            jsonData = request.json
            print("JSONDATA",jsonData)

            rowData = [] # Data to be uploaded to database
            rowData.append(jsonData["email"])
            rowData.append(jsonData["password"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()
            cur.execute("SELECT * FROM users WHERE email = ? AND password = ? ",tuple(rowData))
            userData = cur.fetchone()

            # cur.execute("SELECT following FROM Following WHERE username = ?",(jsonData["username"],))
            # purchaseData = cur.fetchall()

            cur.execute("SELECT * FROM users WHERE email = ?",(jsonData["email"],))
            peopleData = cur.fetchone()

            # cur.execute("SELECT * FROM complaints where complainer = ?", (jsonData["email"],))
            # complaintsData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["fullName"] = peopleData[1]
                response["loginData"]["homeAddress"] = peopleData[3]
                response["loginData"]["availableMoney"] = peopleData[5]
                response["loginData"]["purchaseHistory"] = peopleData[6]
                # purchaseList = []
                # for purchase in purchaseData:
                #     purchaseList.append(purchase[0])
                # response["loginData"]["purchaseHistory"] = purchaseList
                # complaintsList = []
                # for complaint in complaintsData:
                #     complaintsList.append(complaint[1])
                # response["loginData"]["complaintsList"] = complaintsList
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

            cur.execute("SELECT * FROM parts where operating_system = ? AND main_purpose = ? AND architecture = ? ", tuple(rowData))
            computerData = cur.fetchall()
            response = {}
            parts = []
            for part in computerData:
                partsOBJ = {}
                partsOBJ["name"] = part[1]
                partsOBJ["imageBase64"] = part[2]
                partsOBJ["price"] = part[6]
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
            rowData.append(jsonData["creditCard"])
            rowData.append(jsonData["email"])

            conn = mariadb.connect(**config)
            cur = conn.cursor()

            cur.execute("UPDATE users SET creditcard = ? WHERE email = ?", tuple(rowData))
            conn.commit()
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


if __name__ == '__main__':
    app.run()