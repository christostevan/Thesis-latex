"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentWeather = exports.nextDayWeather = void 0;
const axios_1 = __importDefault(require("axios"));
const weatherCalculator_1 = require("./nextDayPrediction/weatherCalculator");
const weatherUtils_1 = require("./hourPrediction/weatherUtils");
const nextDayWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { longitude, latitude } = req.query;
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const tomorrowDate = currentDate.toISOString().slice(0, 10);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,soil_temperature_54cm&start_date=${tomorrowDate}&end_date=${tomorrowDate}`;
        const response = yield axios_1.default.get(url);
        const data = response.data;
        const processedData = yield (0, weatherCalculator_1.processNextDayWeather)(data.hourly);
        res.json(processedData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
});
exports.nextDayWeather = nextDayWeather;
const currentWeather = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { longitude, latitude } = req.query;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,rain,snowfall&timezone=auto&forecast_days=1`;
        const response = yield axios_1.default.get(url);
        const data = response.data;
        const processedData = yield (0, weatherUtils_1.processData)(data);
        res.json(processedData);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
});
exports.currentWeather = currentWeather;
//# sourceMappingURL=weatherAlarm.js.map