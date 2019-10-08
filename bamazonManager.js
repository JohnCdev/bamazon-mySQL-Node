const mysql = require('mysql')
const inq = require('inquirer')

const dbConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

dbConnection.connect(err => {
    if (err) throw err
    console.log("Connected as id: " + dbConnection.threadId)
    managerPrompt()
});

function managerPrompt() {
    inq.prompt([
        {
            name: "choice",
            message: "Select your method:",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
        },
    ])
        .then(ans => {
            switch (ans.choice) {
                case "View Products for Sale":
                    return viewProducts();
                case "View Low Inventory":
                    return viewLow();
                case "Add to Inventory":
                    return addInventory();
                case "Add to Inventory":
                    return addNewProduct();
                default:
                    console.log("you dun goofed");
            }
        });
};

function viewProducts() {
    dbConnection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err
        printProductsTable(res)
        dbConnection.end();
    })
}

function viewLow() {

}

function addInventory() {

}

function addNewProduct() {

}

function printProductsTable(res) {
    console.log("Product Log")
    console.log(`================`)
    res.forEach(e => {
        console.log(`${e.item_id}  ${e.product_name}  $${e.price}  ${e.stock_quantity}`)
    })
    console.log(`================`)
}