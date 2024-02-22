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
exports.weatherHistoryPerMonth = exports.weatherHistory = void 0;
const cityLocation_1 = require("./geoAPI/cityLocation");
const monthCalculator_1 = require("./historyCalculator/monthCalculator");
const dateCalculator_1 = require("./historyCalculator/dateCalculator");
const axios_1 = __importDefault(require("axios"));
const weatherHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        const cityLocation = yield (0, cityLocation_1.cityFetch)(city);
        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation);
        }
        const today = new Date();
        const date = (0, dateCalculator_1.determineDates)(today);
        const { longitude, latitude } = cityLocation;
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&start_date=${date.startDate}&end_date=${date.endDate}&daily=temperature_2m_mean,precipitation_sum&timezone=GMT`;
        const response = yield axios_1.default.get(url);
        const data = response.data;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
});
exports.weatherHistory = weatherHistory;
const weatherHistoryPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        const cityLocation = yield (0, cityLocation_1.cityFetch)(city);
        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation);
        }
        const today = new Date();
        const date = (0, dateCalculator_1.determineDates)(today);
        const { longitude, latitude } = cityLocation;
        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&start_date=${date.startDate}&end_date=${date.endDate}&daily=temperature_2m_mean,precipitation_sum&timezone=GMT`;
        const response = yield axios_1.default.get(url);
        const data = response.data;
        console.log(data);
        const result = yield (0, monthCalculator_1.calculatePerMonth)(data.daily);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
});
exports.weatherHistoryPerMonth = weatherHistoryPerMonth;
//# sourceMappingURL=weatherHistory.js.map