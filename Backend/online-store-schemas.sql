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
  type TEXT,
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
  email TEXT,
  total_price INT,
  tracking_info INT,
  delivery_company TEXT,
  PRIMARY KEY (id)
);

INSERT INTO Parts (name, imageBase64, operating_system, main_purpose, architecture, type, price, voting, discussion_id, company_id) 
  VALUES ('Intel i5','example','Windows','Gaming','Intel', 'CPU', 1000,8,0,0);

INSERT INTO Parts (name, imageBase64, operating_system, main_purpose, architecture, type, price, voting, discussion_id, company_id) 
  VALUES ('Apple M1 Chip','example','macOS','Business','Intel', 'CPU', 1700,7,0,0);

INSERT INTO Parts (name, imageBase64, operating_system, main_purpose, architecture, type, price, voting, discussion_id, company_id) 
  VALUES ('Samsung 390 Series 24" LED Curved FHD FreeSync Monitor','example2','Windows','Business','Intel', 'Monitor',800,9,0,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, voting, discussion) 
  VALUES ('Part1','example','macOS','Gaming','Intel',1000,0,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, type, voting, discussion) 
  VALUES ('Entry level gaming build','example','Windows','Gaming','Intel',2000, 'desktop', 9.5,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, type, voting, discussion) 
  VALUES ('Professional gaming build','example','Windows','Gaming','Intel',4000,'desktop', 10,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, type, voting, discussion) 
  VALUES ('Macbook Pro 2020','example','macOS','Business','Intel',2500,'laptop', 9.5,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, type, voting, discussion) 
  VALUES ('ASUS ROG Zephyrus G14 14" Gaming Laptop','example','Windows','Gaming','AMD',1700,'laptop', 8.5,0);

INSERT INTO DeliveryCompany (name,password) VALUES ('Fedex','company1');
INSERT INTO DeliveryCompany (name,password) VALUES ('UPS','company2');

INSERT INTO Manager (name,password) VALUES ('Sandra Patton','manager1');

INSERT INTO Clerk (name,password) VALUES ('Jack Hernandez','clerk1');

INSERT INTO ComputerPartsCompany (name) VALUES ('Apple');

