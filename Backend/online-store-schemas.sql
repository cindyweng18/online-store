DROP DATABASE IF EXISTS OnlineStore;
CREATE DATABASE OnlineStore;
USE OnlineStore;

CREATE TABLE AvoidList (
  id INT AUTO_INCREMENT,
  email_address TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Clerk (
  id INT AUTO_INCREMENT,
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
  parts TEXT,
  operating_system TEXT,
  main_purpose TEXT,
  architecture TEXT,
  price INT,
  type TEXT,
  voting INT,
  discussion INT,
  PRIMARY KEY (id)
  );

CREATE TABLE ComputerPartsCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE DeliveryCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  password TEXT,
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Manager (
  id INT AUTO_INCREMENT,
  name TEXT,
  password TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Parts (
  id INT AUTO_INCREMENT,
  name TEXT,
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
  purchasehistory TEXT,
  complaints TEXT,
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
  tracking_info INT,
  delivery_company TEXT,
  PRIMARY KEY (id)
);

CREATE TABLE Bids (
  id INT AUTO_INCREMENT,
  deliverycompany TEXT,
  order_id INT, 
  bidprice INT,
  bidstatus BOOLEAN DEFAULT '0',
  PRIMARY KEY (id)
  );

LOAD DATA local INFILE '/Users/nour/GitProjects/online-store/Backend/CPUParts1.csv' 
INTO TABLE parts 
FIELDS TERMINATED BY ',' 
ignore 1 lines
(name,imageBase64,operating_system,main_purpose,architecture,price,voting,discussion_id,company_id)
set id = null;

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, voting, discussion) 
  VALUES ('Part1','example','macOS','Gaming','Intel',1000,0,0);

INSERT INTO DeliveryCompany (name,password) VALUES ('Fedex','company1');
INSERT INTO DeliveryCompany (name,password) VALUES ('UPS','company2');

INSERT INTO Manager (name,password) VALUES ('Sandra Patton','manager1');

INSERT INTO Clerk (name,password) VALUES ('Jack Hernandez','clerk1');

INSERT INTO ComputerPartsCompany (name) VALUES ('Apple');

