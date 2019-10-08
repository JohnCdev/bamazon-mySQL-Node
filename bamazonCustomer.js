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

dbConnection.connect(err => {
    if (err) throw err
    console.log("Connected as id: " + dbConnection.threadId)
    userPrompt()
});

function userPrompt() {
    dbConnection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err;
        printProductsTable(res);
        inq.prompt([
            {
                name: "id",
                message: "Which prodct ID do you want to buy?",
            },
            {
                name: "quantity",
                message: "How many do you want to buy?"
            }
        ])
            .then(ans => {
                checkStock(ans)
            });
    });
}

function checkStock(ans) {
    const id = ans.id
    const quant = ans.quantity
    dbConnection.query("SELECT * FROM products WHERE item_id=?",[id], (err, res) => {
        if (err) throw err
        if (quant <= res[0].stock_quantity) {
            const newQuant = res[0].stock_quantity - quant
            const price = quant * res[0].price
            console.log("Total price of purchase is $" + price)
            updateStock(id, newQuant)
        } else {
            console.log("Not enough product in stock to complete your request, aborting")
            dbConnection.end();
        }
    });
}

function updateStock(id, newQuant) {
    //quantity not updating
    dbConnection.query("UPDATE products SET stock_quantity=? WHERE item_id=?",[newQuant, id], (err, res) => {
        if (err) throw err
        console.log("Updated stock quantity of ID " + id + " to " + newQuant)
        dbConnection.end(); 
    });
}

function printProductsTable(res) {
    let table = new Table({
        head: ['ID', 'Name']
      , colWidths: [10, 100]
    });

    res.forEach(e => {
        table.push([e.item_id, e.product_name])
    });

    console.log("Product Log")
    console.log(table.toString())
    console.log(`================`)
}