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
    supervisorPrompt()
});

function supervisorPrompt() {
    inq.prompt([
        {
            name: "choice",
            message: "Select your method:",
            type: "list",
            choices: ["View Products Sales by Department", "Create New Department", "Exit"]
        },
    ])
        .then(ans => {
            switch (ans.choice) {
                case "View Products Sales by Department":
                    return viewSales();
                case "Create New Department":
                    return addNewDepartment();
                case "Exit":
                    return dbConnection.end();
                default:
                    console.log("you dun goofed");
                    dbConnection.end();
            }
        });
};

function viewSales() {
    console.log("\nSales by Department")
    var query = "SELECT d.department_id, d.department_name, d.over_head_costs, SUM(p.product_sales) as sales, SUM(p.product_sales - d.over_head_costs) as total_profit ";
    query += "FROM products as p INNER JOIN departments as d ON d.department_name = p.department_name ";
    query += "GROUP BY d.department_id ORDER BY d.department_id";
    dbConnection.query(query, (err, res) => {
        if (err) throw err
        let table = new Table({
            head: ['Department ID', 'Department Name', 'Over Head Costs', 'Product Sales', 'Total Profit']
            , colWidths: [10, 30, 15, 20, 20]
        });

        res.forEach(e => {
            table.push([e.department_id, e.department_name, "$" + e.over_head_costs, "$" + e.sales, "$" + e.total_profit])
        });

        console.log(table.toString())
        console.log(`================`)
        supervisorPrompt()
    })
}

function addNewDepartment() {
    inq.prompt([
        {
            name: "name",
            message: "Department name:"
        },
        {
            name: "costs",
            message: "Over Head Costs:"
        },
    ])
        .then(ans => {
            dbConnection.query("INSERT INTO departments (department_name, over_head_costs) VALUES(?, ?)", [ans.name,ans.costs], (err, res) => {
                if (err) throw err
                console.log("\n" + ans.name + " added to departments.\n")
                supervisorPrompt()
            })
        });
}