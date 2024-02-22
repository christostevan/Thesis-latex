"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePrecipitation = exports.calculateTempurature = exports.calculatePerMonth = void 0;
function calculatePerMonth(data) {
    const byYearAndMonth = {};
    for (let i = 0; i < data.time.length; i++) {
        const date = new Date(data.time[i]);
        const year = date.getFullYear();
        const month = date.getMonth();
        const temperature = data.temperature_2m_mean[i];
        const precipitation = data.precipitation_sum[i];
        if (!byYearAndMonth[year]) {
            byYearAndMonth[year] = {};
        }
        if (!byYearAndMonth[year][month]) {
            byYearAndMonth[year][month] = { temperature: [temperature], precipitation: [precipitation] };
        }
        else {
            byYearAndMonth[year][month].temperature.push(temperature);
            byYearAndMonth[year][month].precipitation.push(precipitation);
        }
    }
    const result = {};
    for (const year in byYearAndMonth) {
        const averageTemperature = calculateTempurature(byYearAndMonth[year]);
        const averagePrecipitation = calculatePrecipitation(byYearAndMonth[year]);
        result[parseInt(year)] = {
            temperature: averageTemperature,
            precipitation: averagePrecipitation,
        };
    }
    return result;
}
exports.calculatePerMonth = calculatePerMonth;
function calculateTempurature(data) {
    const averages = {};
    for (const month in data) {
        const temperatures = data[month].temperature;
        const sum = temperatures.reduce((acc, temp) => acc + temp, 0);
        const average = sum / temperatures.length;
        const averageOneDecimal = parseFloat(average.toFixed(1));
        averages[parseInt(month)] = averageOneDecimal;
    }
    return averages;
}
exports.calculateTempurature = calculateTempurature;
function calculatePrecipitation(data) {
    const averages = {};
    for (const month in data) {
        const precipitations = data[month].precipitation;
        const sum = precipitations.reduce((acc, temp) => acc + temp, 0);
        const average = sum / precipitations.length;
        const averageOneDecimal = parseFloat(average.toFixed(1));
        averages[parseInt(month)] = averageOneDecimal;
    }
    return averages;
}
exports.calculatePrecipitation = calculatePrecipitation;
//# sourceMappingURL=monthCalculator.js.map