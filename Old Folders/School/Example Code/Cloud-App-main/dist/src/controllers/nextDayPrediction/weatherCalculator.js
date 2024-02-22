"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanSoilFrost = exports.scanTemperature = exports.processNextDayWeather = void 0;
function processNextDayWeather(data) {
    let result;
    let temperatureResult;
    let soilFrostResult;
    if (data !== null) {
        temperatureResult = scanTemperature(data.temperature_2m);
        soilFrostResult = scanSoilFrost(data.soil_temperature_54cm);
    }
    if (temperatureResult == true) {
        result = {
            result: true,
            type: 'Temperature'
        };
    }
    else if (soilFrostResult == true) {
        result = {
            result: true,
            type: 'Soil frost'
        };
    }
    else {
        result = {
            result: false,
        };
    }
    return result;
}
exports.processNextDayWeather = processNextDayWeather;
;
function scanTemperature(data) {
    for (const item in data) {
        if (data.hasOwnProperty(item)) {
            const temperature = data[item];
            if (temperature >= 25) {
                return true;
            }
        }
    }
    return false;
}
exports.scanTemperature = scanTemperature;
;
function scanSoilFrost(data) {
    for (const item in data) {
        if (data.hasOwnProperty(item)) {
            const temperature = data[item];
            if (temperature < 0) {
                return true;
            }
        }
    }
    return false;
}
exports.scanSoilFrost = scanSoilFrost;
;
//# sourceMappingURL=weatherCalculator.js.map