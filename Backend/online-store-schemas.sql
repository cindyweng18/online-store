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
  processor INT,
  memory INT,
  hard_drive INT,
  gpu INT,
  monitor INT,
  keyboard INT,
  mouse INT,
  price INT,
  voting INT,
  discussion INT,
  PRIMARY KEY (id)
  );

/*
load data local infile '\ComputerSystems1.csv'
into table computer
fields terminated by ',' LINES STARTING BY '"'
ignore 1 lines
(name,imageBase64,type,operating_system,main_purpose,architecture,processor,memory,hard_drive,gpu,
monitor,keyboard,mouse,price,voting,discussion)
set id = null;
*/

CREATE TABLE ComputerPartsCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE DeliveryCompany (
  id INT AUTO_INCREMENT,
  name TEXT,
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Manager (
  id INT AUTO_INCREMENT,
  name TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Parts (
  id INT,
  name TEXT,
  part_type TEXT,
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



INSERT INTO DeliveryCompany (name) VALUES ('Fedex');
INSERT INTO DeliveryCompany (name) VALUES ('UPS');

INSERT INTO Manager (name) VALUES ('Sandra Patton');

INSERT INTO Clerk (name) VALUES ('Jack Hernandez');

INSERT INTO ComputerPartsCompany (name) VALUES ('Apple');


/*

***Load CSV of parts and systems***
load data local infile '\CPUParts2.csv'
into table parts
fields terminated by ',' LINES STARTING BY '"'
ignore 1 lines
(id,name, part_type, imageBase64, operating_system, main_purpose, architecture, price, voting, discussion_id, company_id);

*/








