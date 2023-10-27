CREATE DATABASE fuel;
USE fuel;

-- User Info table
CREATE TABLE user_info(
    id integer PRIMARY KEY AUTO_INCREMENT,
    user_name VARCHAR(25) UNIQUE NOT NULL,
    user_password VARCHAR(100) NOT NULL
);
-- Client Information table
CREATE TABLE client_information(
    id integer PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(50) NOT NULL,
    address1 VARCHAR(100) NOT NULL,
    address2 VARCHAR(100) NULL,
    city VARCHAR(100) NOT NULL,
    us_state VARCHAR(2) NOT NULL,
    zipcode VARCHAR(100) NOT NULL,
    FOREIGN KEY (id) REFERENCES user_info(id)
);
-- Fuel Quote History table
CREATE TABLE fuel_quote_history (
    location_id integer PRIMARY KEY AUTO_INCREMENT,
    id integer NOT NULL,
    gallons_requested FLOAT NOT NULL,
    delivery_date DATE NOT NULL,
    date_created DATE NOT NULL,
    suggested_price FLOAT NOT NULL,
    total FLOAT NOT NULL,
    FOREIGN KEY (id) REFERENCES client_information(id)
);

INSERT INTO user_info (user_name, user_password) VALUES ("123ant", "password"),
("user2", "password2");

INSERT INTO client_information(fullName, address1, address2, city, us_state, zipcode)
VALUES ("Eric Cartman", "123 Test St", "Apt 34", "South Park", "CO", "84235"),
("Anthony Castillo", "123 Sesame St", "Apt 99", "Houston", "TX", "77123");

INSERT INTO fuel_quote_history (id, gallons_requested, delivery_date, date_created, suggested_price, total)
VALUES (1, 100.5, '2023-10-25', '2023-10-25', 1.5, 150.0),
(2, 200.0, '2023-10-26', '2023-10-26', 2.0, 200.0);