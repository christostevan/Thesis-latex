"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherAlarm_1 = require("./controllers/weatherAlarm");
const weatherHistory_1 = require("./controllers/weatherHistory");
const app = (0, express_1.default)();
const cors = require('cors');
const port = process.env.PORT || 3000;
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get('/', (req, res) => {
    res.send('Hello, World!');
});
app.get('/nextDayWeather', weatherAlarm_1.nextDayWeather);
app.get('/currentWeather', weatherAlarm_1.currentWeather);
app.get('/weatherHistory', weatherHistory_1.weatherHistory);
app.get('/weatherHistoryPerMonth', weatherHistory_1.weatherHistoryPerMonth);
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
exports.default = server;
//# sourceMappingURL=index.js.map