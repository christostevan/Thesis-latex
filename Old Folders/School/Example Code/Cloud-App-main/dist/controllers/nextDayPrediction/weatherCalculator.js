"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scanTemperature = exports.processNextDayWeather = void 0;
function processNextDayWeather(data) {
    let result;
    let temperatureResult;
    if (data !== null) {
        temperatureResult = scanTemperature(data.temperature_2m);
    }
    if (temperatureResult !== null) {
        result = {
            result: true,
            type: 'Temperature'
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
    let result = null;
    for (const item in data) {
        if (data.hasOwnProperty(item)) {
            const temperature = data[item];
            if (temperature > 25) {
                result = temperature;
            }
        }
    }
    return result;
}
exports.scanTemperature = scanTemperature;
;
//# sourceMappingURL=weatherCalculator.js.map