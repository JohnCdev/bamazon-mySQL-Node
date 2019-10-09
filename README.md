# bamazon-mySQL-Node

## Description:
Node app integrated with mySQL to mock inventory management for a store. Allows control and interaction with the database from the perspective of a customer, manager and supervisor with relevant access and commands for each.

## How to use:
Run from node with proper javascript file name for each access type and you will be prompted for commands in the cli.

### bamazonCustomer.js
- Allows customers to purchase items from the listed products, updating the stock quantity and sales

### bamazonManager.js
- Manager can:
  - View all products for sale
  - View all products with low stock
  - Add to product stock inventory
  - Add a new product

### bamazonSupervisor.js
- Supervisor can:
  - View sales based on product departments
  - Add a new department category

## Technologies: 
- JS
- Node.js
- mySQL

## Packages:
- mysql
- inquirer
- cli-table

## Example Images

### bamazonCustomer.js
![customer](/RM_images/customer.PNG)

### bamazonManager.js
Options

![customer](/RM_images/manSelect.PNG)

View Products

![customer](/RM_images/manView.PNG)

View Low Stock

![customer](/RM_images/manLow.PNG)

Add to Stock

![customer](/RM_images/manStock.PNG)

Add New Product

![customer](/RM_images/manAdd.PNG)

### bamazonSupervisor.js
Options

![customer](/RM_images/supSelect.PNG)

View Sales

![customer](/RM_images/supSales2.PNG)

Add Department

![customer](/RM_images/supAddNew2.PNG)
