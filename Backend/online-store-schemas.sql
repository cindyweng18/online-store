DROP DATABASE IF EXISTS OnlineStore;
CREATE DATABASE OnlineStore;
USE OnlineStore;

CREATE TABLE AvoidList (
  id INT AUTO_INCREMENT,
  email TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Clerk (
  id INT AUTO_INCREMENT,
  email TEXT,
  name TEXT,
  password TEXT,
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE ComplaintsFiled (
  id INT AUTO_INCREMENT,
  complainer TEXT,
  complaint TEXT,
  offender TEXT,
  email TEXT,
  defense TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Computer (
  id INT AUTO_INCREMENT,
  name TEXT,
  imageBase64 LONGTEXT,
  type TEXT,
  operating_system TEXT,
  main_purpose TEXT,
  architecture TEXT,
  cpu TEXT,
  memory TEXT,
  harddrive TEXT,
  gpu TEXT,
  monitor TEXT,
  keyboard TEXT,
  mouse TEXT,
  price INT,
  voting INT,
  discussion INT,
  PRIMARY KEY (id)
  );

CREATE TABLE ComputerPartsCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  password TEXT,
  complaintsreceived TEXT,
  email TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE DeliveryCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  password TEXT,
  complaintsreceived TEXT,
  email TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Manager (
  id INT AUTO_INCREMENT,
  email TEXT,
  name TEXT, 
  password TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Parts (
  id INT AUTO_INCREMENT,
  name TEXT,
  type TEXT,
  imageBase64 LONGTEXT,
  operating_system TEXT,
  main_purpose TEXT,
  architecture TEXT,
  price INT,
  voting INT,
  discussion_id INT,
  company_id INT,
  PRIMARY KEY (id)
  );

CREATE TABLE Reviews (
  id INT AUTO_INCREMENT,
  item_id INT,
  name TEXT,
  commenter TEXT,
  comment TEXT,
  vote INT,
  PRIMARY KEY (id)
  );

CREATE TABLE TabooList (
  id INT AUTO_INCREMENT,
  word TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Users (
  id INT AUTO_INCREMENT,
  fullname TEXT,
  email TEXT,
  homeaddress TEXT,
  creditcard TEXT,
  availablemoney INT DEFAULT 0,
  password TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Cart (
  email TEXT,
  name TEXT,
  imageBase64 LONGTEXT,
  price INT
);

CREATE TABLE CreditCard (
  id INT AUTO_INCREMENT,
  name TEXT,
  number TEXT,
  cvc TEXT,
  expirationDate TEXT,
  email TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE Orders (
  id INT AUTO_INCREMENT,
  customerName TEXT,
  email TEXT,
  totalPrice INT,
  itemList TEXT,
  homeAddress TEXT,
  tracking_info TEXT,
  delivery_company TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE Bids (
  id INT AUTO_INCREMENT,
  deliverycompany TEXT,
  order_id INT, 
  bidprice INT,
  bidstatus BOOLEAN DEFAULT '0',
  justification TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE warnings(
  id INT AUTO_INCREMENT,
  email TEXT,
  reasoning TEXT,
  decision BOOLEAN DEFAULT '0',
  PRIMARY KEY (id)
);

--CHANGE THE FILE TO WHERE THIS LOCAL FILE IS LOCATED
LOAD DATA local INFILE '/Users/cindyweng/desktop/online-store/Backend/CPUParts2.csv' 
INTO TABLE parts 
FIELDS TERMINATED BY ',' 
ignore 1 lines
(id,name,type,imageBase64,operating_system,main_purpose,architecture,price,voting,discussion_id,company_id)
set id = null;


LOAD DATA local INFILE '/Users/cindyweng/desktop/online-store/Backend/ComputerSystems1.csv' 
INTO TABLE computer
FIELDS TERMINATED BY ',' 
ignore 1 lines
(name,imageBase64,type, operating_system,main_purpose,architecture,cpu,memory,harddrive,gpu,monitor,keyboard,mouse,price,voting,discussion)
set id = null;

LOAD DATA local INFILE '/Users/cindyweng/desktop/online-store/Backend/TabooList.txt' 
INTO TABLE TabooList 
(word);

INSERT INTO DeliveryCompany (email,password, name) VALUES ('fedex@digipower.com', 'company1','Fedex');
INSERT INTO DeliveryCompany (email,password, name) VALUES ('ups@digipower.com','company2', 'UPS');

INSERT INTO Manager (email,password, name) VALUES ('sandra@gmail.com','manager1', 'Sandra Doe');

INSERT INTO Clerk (email,password, name) VALUES ('jack@gmail.com','clerk1','Jack Hernandez');

INSERT INTO ComputerPartsCompany (email, name, password) VALUES ('computer@digipower.com','Computer Parts & Wholes', 'computer1');

