// get the client
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "saborosoUser",
  database: "saboroso",
  password: "1@bA#dc3_A!5JSOiu.",
});
module.exports = connection;
