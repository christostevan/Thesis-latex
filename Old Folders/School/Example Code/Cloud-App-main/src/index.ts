import express, { Request, Response } from 'express';
import { nextDayWeather, currentWeather } from './controllers/weatherAlarm';
import { weatherForecast } from './controllers/weatherForecast';
import { weatherHistory, weatherHistoryPerMonth } from './controllers/weatherHistory';
/**
 * Application startup 
 */
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const { poolConnect, pool } = require("./database/db");

const corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
};


app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// }); 

app.get('/nextDayWeather', nextDayWeather);
app.get('/currentWeather', currentWeather);
app.get('/weatherForecast', weatherForecast); // will allow minimum forecast 1 day, max forecast 16 days
app.get('/weatherHistory', weatherHistory);
app.get('/weatherHistoryPerMonth', weatherHistoryPerMonth);
app.post("/database/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required in the request body" });
    }
    try {
        await poolConnect;
        const request = pool.request();
        const queryString = "SELECT * FROM [dbo].[User] WHERE username = @username AND password = @password";
        const result = await request.input("username", username).input("password", password).query(queryString);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: "Invalid username and/or password" });
        }

        // res.json({ message: true });
        res.json(result.recordset);
    } catch (err: any) {
        console.error("Error getting the data from database: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
});
app.post("/database/register", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required in the request body" });
    }
    try {
        await poolConnect;
        const request = pool.request();

        // Check if the username already exists in the database
        const checkQuery = "SELECT COUNT(*) AS count FROM [dbo].[User] WHERE username = @username";
        const checkResult = await request.input("username", username).query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        const queryString = "INSERT INTO [dbo].[User] (username, password) VALUES (@username1, @password1)";
        await request.input("username1", username).input("password1", password).query(queryString);

        res.json({ message: true });
    } catch (err: any) {
        console.error("Error getting the data from database: ", err.message);
        res.status(500).json({ message: "Server error" });
    }
});


const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default server;