CREATE DATABASE fuel;
USE fuel;

CREATE TABLE client_information(
    id integer PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100) NULL,
    city VARCHAR(100) NOT NULL,
    us_state VARCHAR(2) NOT NULL,
    zipcode VARCHAR(100) NOT NULL,
    
);
CREATE TABLE user_info(
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(25),
    user_password VARCHAR(100)
);
INSERT INTO client_information(fullName, address1, address2, city, us_state, zipcode)
VALUES ("Eric Cartman", "123 Test St", "Apt 34", "South Park", "CO", "84235"),
("Anthony Castillo", "123 Sesame St", "Apt 99", "Houston", "TX", "77123");

INSERT INTO user_info (user_name, user_password) VALUES ("123ant", "password"),
("user2", "password2");