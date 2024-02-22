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
exports.weatherForecast = void 0;
const cityLocation_1 = require("./geoAPI/cityLocation");
const axios_1 = __importDefault(require("axios"));
const weatherForecast = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const city = req.query.city;
        const days = parseInt(req.query.days);
        const cityLocation = yield (0, cityLocation_1.cityFetch)(city);
        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation);
        }
        const { longitude, latitude } = cityLocation;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&forecast_days=${days}`;
        const response = yield axios_1.default.get(url);
        const data = response.data;
        res.json(data.daily);
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
});
exports.weatherForecast = weatherForecast;
//# sourceMappingURL=weatherForecast.js.map