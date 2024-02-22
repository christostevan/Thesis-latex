const fs = require("fs");

const mysql = require("mysql2");

require("dotenv").config();

module.exports = mysql.createConnection({
  host: process.env.HOST_M70,
  user: process.env.USER_M70,
  password: process.env.PASSWORD_M70,
  database: process.env.DATABASE_M70,
  port: 3306,
  ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
});
