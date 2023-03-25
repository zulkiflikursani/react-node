var mysql = require("mysql");
const hostname = "localhost";
const user = "root";
const password = "";
const database = "zr-cell-react";
const port = "5000";

var con = mysql.createConnection({
  host: hostname,
  user: user,
  password: password,
  database: database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports = con;
