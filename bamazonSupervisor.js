const mysql = require('mysql')
const inq = require('inquirer')
var Table = require('cli-table')

const dbConnection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

dbConnection.connect(function (err) {
    if (err) throw err
    console.log("Connected as id: " + dbConnection.threadId)
    userPrompt()
});



function printProductsTable(res) {
    let table = new Table({
        head: ['ID', 'Name', 'Unit Price', 'Stock Quantity']
        , colWidths: [10, 30, 15, 20]
    });

    res.forEach(e => {
        table.push([e.item_id, e.product_name, "$" + e.price, e.stock_quantity])
    });

    console.log(table.toString())
    console.log(`================`)
}