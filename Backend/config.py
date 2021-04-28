import json

class Config():
    def __init__(self):
        print("Loading configs...")
        with open (r'./config-template.json') as configFile:
            self.configData = json.load(configFile)
    
    #Getters
    def getHost(self):
        return str(self.configData["host"])

    def getPort(self):
        return self.configData["port"]

    def getUser(self):
        return str(self.configData["user"])

    def getPassword(self):
        return str(self.configData["password"])

    def getData(self):
        return str(self.configData["database"])