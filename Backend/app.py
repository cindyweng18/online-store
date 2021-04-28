import time
import flask
import json
import mariadb
from flask import jsonify, request
from flask_cors import CORS, cross_origin
#from config import *

app = flask.Flask(__name__)
CORS(app, support_credentials=False)
app.config["DEBUG"] = True

#configObj = Config()

config = {
    'host': '127.0.0.1',
    'port': 3306,
    'user': 'nour',
    'password': 'Winxclub1',
    'database': 'Computers'
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
            rowData.append(jsonData([]))
            rowData.append(jsonData([]))
            rowData.append(jsonData[[]])

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
                cur.execute("INSERT INTO users (fullName, email, password, homeAddress, creditCard, availableMoney, purchaseHistory) VALUES (?,?,?,?,?,?,?)", tuple(rowData))
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

            cur.execute("SELECT * FROM complaints where complainer = ?", (jsonData["email"],))
            complaintsData = cur.fetchall()

            if userData is not None:
                response = {}
                response["loginData"] = {}
                response["verified"] = {}
                response["verified"] = True
                response["loginData"]["fullName"] = peopleData[1]
                response["loginData"]["homeAddress"] = peopleData[3]
                response["loginData"]["availableMoney"] = peopleData[4]
                response["loginData"]["purchaseHistory"] = peopleData[5]
                # purchaseList = []
                # for purchase in purchaseData:
                #     purchaseList.append(purchase[0])
                # response["loginData"]["purchaseHistory"] = purchaseList
                complaintsList = []
                for complaint in complaintsData:
                    complaintsList.append(complaint[1])
                response["loginData"]["complaintsList"] = complaintsList
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

if __name__ == '__main__':
    app.run()