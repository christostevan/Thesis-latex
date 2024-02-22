const mssql = require('mssql');

// For connection to the db
const config = {
    user: "userWeather",
    password: "Admin123,!",
    server: "kmresitserver.database.windows.net",
    port: 1433,
    database: "WeatherAppResit",
    authentication: {
        type: "default" // azure-active-directory-default
    },
    options: {
        encrypt: true,
        trustServerCertificate: true,
        // rejectUnauthorized: false,
        // ca: require('fs').readFileSync('').toString();
    },
};

const pool = new mssql.ConnectionPool(config);
const poolConnect = pool.connect();

module.exports = {
    pool,
    poolConnect
}

// async function connectToDatabase() {
//     try {
//         const pool = await mssql.connect(config);
//         console.log("Reading rows from the table");
//         const result = await pool.request().query("Select * from [dbo].[User]");
//         console.log(result.recordset);

//         pool.close();
//         mssql.close();
//     } catch (err: any) {
//         console.error("Error connecting to the database: ", err.message);
//     }
// }

// connectToDatabase();