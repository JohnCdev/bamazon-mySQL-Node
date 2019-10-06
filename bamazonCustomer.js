const mysql = require('mysql')
const inq = require('inquirer')

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

function userPrompt() {
    // printProducts()
    dbConnection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        printProductsTable(res);
        // inq.prompt([
        //     {
        //         name: "selection",
        //         message: "What do you want to do?",
        //         type: "list",
        //         choices: ['', '', '']
        //     }
        // ])
        //     .then(choice => {
        //         switch (choice.selection) {
        //             case '':
        //                 break;
        //             case '':
        //                 break;
        //             case 'Exit':
        //                 break;
        //             default:
        //                 console.log("Ya dun goofed");
        //         }
        //     });
    });
    dbConnection.end()
}

function printProductsTable(res) {
    console.log(`================`)
    console.log(`Product ID | Product Name | Price`)
    console.log(`${res[0].item_id} ${res[0].product_name} ${res[0].price}`)
    console.log(`================`)
}