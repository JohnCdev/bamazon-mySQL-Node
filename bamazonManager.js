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
                case "Add New Product":
                    return addNewProduct();
                case "Exit":
                    return dbConnection.end();
                default:
                    console.log("you dun goofed");
                    dbConnection.end();
            }
        });
};

function viewProducts() {
    dbConnection.query("SELECT * FROM products", (err, res) => {
        if (err) throw err
        printProductsTable(res)
        managerPrompt()
    })
}

function viewLow() {
    dbConnection.query("SELECT * FROM products WHERE stock_quantity <= 500", (err, res) => {
        if (err) throw err
        console.log("\n\nShowing products with less than 500 units in stock.")
        printProductsTable(res)
        managerPrompt()
    })
}

function addInventory() {
    inq.prompt([
        {
            name: "id",
            message: "Product ID to update stock:",
        },
        {
            name: "amt",
            message: "Amount to update:"
        }
    ])
        .then(ans => {
            dbConnection.query("UPDATE products SET stock_quantity=stock_quantity + ? WHERE item_id=?", [ans.amt, ans.id], (err, res) => {
                if (err) throw err
                console.log(`Updated product ID ${ans.id} stock quantity by ${ans.amt} units.`)
                managerPrompt()
            })
        });

}

function addNewProduct() {
    inq.prompt([
        {
            name: "name",
            message: "Product name:"
        },
        {
            name: "dep",
            message: "Department:"
        },
        {
            name: "price",
            message: "Unit price:"
        },
        {
            name: "quant",
            message: "Initial quantity:"
        }
    ])
        .then(ans => {
            dbConnection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)", [ans.name, ans.dep, ans.price, ans.quant], (err, res) => {
                if (err) throw err
                console.log(ans.name + " added to products.")
                managerPrompt()
            })
        });
}

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