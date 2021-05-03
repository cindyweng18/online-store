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
  complaintsreceived TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Manager (
  id INT AUTO_INCREMENT,
  name TEXT,
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
  password TEXT,
  PRIMARY KEY (id)
  );

CREATE TABLE Cart (
  email TEXT,
  name TEXT,
  imageBase64 LONGTEXT,
  price INT
);

INSERT INTO Parts (name, imageBase64, operating_system, main_purpose, architecture, price, voting, discussion_id, company_id) 
  values ('Part1','example','macOS','Gaming','Intel',1000,0,0,0);

INSERT INTO Computer (name, imageBase64, operating_system, main_purpose, architecture, price, voting, discussion) 
  values ('Part1','example','macOS','Gaming','Mac',1000,0,0);

INSERT INTO DeliveryCompany (name) VALUES ('Fedex');
INSERT INTO DeliveryCompany (name) VALUES ('UPS');

INSERT INTO Manager (name) VALUES ('Sandra Patton');

INSERT INTO Clerk (name) VALUES ('Jack Hernandez');

INSERT INTO ComputerPartsCompany (name) VALUES ('Apple');

