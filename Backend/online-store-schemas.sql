DROP DATABASE IF EXISTS onlinestore;
CREATE DATABASE onlinestore;
USE onlinestore;

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
  parts TEXT,
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
  availablemoney INT,
  purchasehistory TEXT,
  password TEXT,
  PRIMARY KEY (id)
  );