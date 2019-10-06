DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(15,2) NULL,
    stock_quantity INTEGER(10) DEFAULT 0,
    products_sales INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(20) NULL,
    PRIMARY KEY (department_id)
);

#products seed
INSERT INTO products (product_name, department_name, price, quantity, products_sales)
VALUES ("item", "vidja game", 50);

#department seed
INSERT INTO departments (department_id, department_name, over_head_costs)
VALUES ("item", "vidja game", 50);
