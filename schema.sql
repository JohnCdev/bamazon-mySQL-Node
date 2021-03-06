DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price DECIMAL(15,2) NULL,
    stock_quantity INTEGER(10) DEFAULT 0,
    product_sales INTEGER(10) DEFAULT 0,
    PRIMARY KEY (item_id)
);

CREATE TABLE departments (
    department_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    over_head_costs INTEGER(20) NULL,
    PRIMARY KEY (department_id)
);

#products seed
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Video Game","Electronics",60,1000,6000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("TV","Electronics",500,100,10000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Nintendos","Electronics",200,10000,5000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Soda","Groceries",6,5000,1000);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pasta","Groceries",4,2000,480);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pudding","Groceries",2,750,200);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Shirt","Apparel",60,1000,600);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Watch","Apparel",80,50,800);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Pants","Apparel",40,200,180);
INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Medicine","Health",8,100,80);


#department seed
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics",1000);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Groceries",500);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Apparel",200);
INSERT INTO departments (department_name, over_head_costs)
VALUES ("Health",100);