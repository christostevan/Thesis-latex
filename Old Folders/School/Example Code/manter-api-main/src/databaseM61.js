const fs = require("fs");

const mysql = require("mysql2");

require("dotenv").config();

module.exports = mysql.createConnection({
  host: process.env.HOST_M61,
  user: process.env.USER_M61,
  password: process.env.PASSWORD_M61,
  database: process.env.DATABASE_M61,
  port: 3306,
  ssl: { ca: fs.readFileSync("DigiCertGlobalRootCA.crt.pem") },
});
