"use strict";
const weatherUtils = require('../src/controllers/hourPrediction/weatherUtils');
describe('processWeatherConditions', () => {
    it('should return weather report for heavy snowfall', () => {
        const mockData = {
            snowfall: {
                0: 0, 1: 0, 2: 51, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0, 23: 0
            },
            rain: {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0.2, 23: 0.1
            },
            temperature_2m: {
                0: 16.6, 1: 16.2, 2: 16.5, 3: 16, 4: 15.8,
                5: 16.1, 6: 16.9, 7: 17.7, 8: 18.7, 9: 19.3,
                10: 19.8, 11: 20.3, 12: 19.8, 13: 20.3, 14: 21.5,
                15: 21.7, 16: 21.7, 17: 20.9, 18: 19.9, 19: 18.7,
                20: 18.1, 21: 17.6, 22: 16.5, 23: 15.8
            },
        };
        const ID = 2;
        const result = weatherUtils.processWeatherConditions(ID, mockData);
        expect(result).toEqual({
            report: 'Heavy snowfall',
            timezone: 'GMT',
            time: '1:00',
        });
    });
    it('should return weather report for heavy rain', () => {
        const mockData = {
            snowfall: {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0, 23: 0
            },
            rain: {
                0: 0, 1: 0, 2: 11, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0.2, 23: 0.1
            },
            temperature_2m: {
                0: 16.6, 1: 16.2, 2: 16.5, 3: 16, 4: 15.8,
                5: 16.1, 6: 16.9, 7: 17.7, 8: 18.7, 9: 19.3,
                10: 19.8, 11: 20.3, 12: 19.8, 13: 20.3, 14: 21.5,
                15: 21.7, 16: 21.7, 17: 20.9, 18: 19.9, 19: 18.7,
                20: 18.1, 21: 17.6, 22: 16.5, 23: 15.8
            },
        };
        const ID = 2;
        const result = weatherUtils.processWeatherConditions(ID, mockData);
        expect(result).toEqual({
            report: 'Heavy rain',
            timezone: 'GMT',
            time: '1:00',
        });
    });
    it('should return weather report for hail', () => {
        const mockData = {
            snowfall: {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0, 23: 0
            },
            rain: {
                0: 0, 1: 0, 2: 11, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0.2, 23: 0.1
            },
            temperature_2m: {
                0: 16.6, 1: 16.2, 2: -1, 3: 16, 4: 15.8,
                5: 16.1, 6: 16.9, 7: 17.7, 8: 18.7, 9: 19.3,
                10: 19.8, 11: 20.3, 12: 19.8, 13: 20.3, 14: 21.5,
                15: 21.7, 16: 21.7, 17: 20.9, 18: 19.9, 19: 18.7,
                20: 18.1, 21: 17.6, 22: 16.5, 23: 15.8
            },
        };
        const ID = 2;
        const result = weatherUtils.processWeatherConditions(ID, mockData);
        expect(result).toEqual({
            report: 'Hail',
            timezone: 'GMT',
            time: '1:00',
        });
    });
    it('should return weather report for no extreme weather conditions', () => {
        const mockData = {
            snowfall: {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0, 23: 0
            },
            rain: {
                0: 0, 1: 0, 2: 0, 3: 0, 4: 0,
                5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
                10: 0, 11: 0, 12: 0, 13: 0, 14: 0,
                15: 0, 16: 0, 17: 0, 18: 0, 19: 0,
                20: 0, 21: 0, 22: 0.2, 23: 0.1
            },
            temperature_2m: {
                0: 16.6, 1: 16.2, 2: 16.5, 3: 16, 4: 15.8,
                5: 16.1, 6: 16.9, 7: 17.7, 8: 18.7, 9: 19.3,
                10: 19.8, 11: 20.3, 12: 19.8, 13: 20.3, 14: 21.5,
                15: 21.7, 16: 21.7, 17: 20.9, 18: 19.9, 19: 18.7,
                20: 18.1, 21: 17.6, 22: 16.5, 23: 15.8
            },
        };
        const ID = 2;
        const result = weatherUtils.processWeatherConditions(ID, mockData);
        expect(result).toEqual({
            report: 'null',
            timezone: 'GMT',
            time: '1:00',
        });
    });
});
describe('processData', () => {
    it('hould return correct weather report for the current hour', () => {
        const input = {
            latitude: 40.710335,
            longitude: -73.99307,
            generationtime_ms: 1.278996467590332,
            utc_offset_seconds: -14400,
            timezone: 'America/New_York',
            timezone_abbreviation: 'EDT',
            elevation: 51,
            hourly_units: { time: 'iso8601', temperature_2m: '°C', rain: 'mm', snowfall: 'cm' },
            hourly: {
                time: [
                    '2023-07-17T00:00', '2023-07-17T01:00',
                    '2023-07-17T02:00', '2023-07-17T03:00',
                    '2023-07-17T04:00', '2023-07-17T05:00',
                    '2023-07-17T06:00', '2023-07-17T07:00',
                    '2023-07-17T08:00', '2023-07-17T09:00',
                    '2023-07-17T10:00', '2023-07-17T11:00',
                    '2023-07-17T12:00', '2023-07-17T13:00',
                    '2023-07-17T14:00', '2023-07-17T15:00',
                    '2023-07-17T16:00', '2023-07-17T17:00',
                    '2023-07-17T18:00', '2023-07-17T19:00',
                    '2023-07-17T20:00', '2023-07-17T21:00',
                    '2023-07-17T22:00', '2023-07-17T23:00'
                ],
                temperature_2m: [
                    24, 23.8, 23.5, 23.9, 23.7,
                    23.7, 23.2, 24.2, 25, 25.8,
                    26.9, 28.1, 29.9, 31.3, 31.7,
                    32.8, 32.9, 32.5, 31.7, 30.5,
                    28.4, 25.7, 25, 24.3
                ],
                rain: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ],
                snowfall: [
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 0
                ]
            }
        };
        const result = weatherUtils.processData(input);
        const currentHourInGMT = new Date().getUTCHours();
        expect(result).toEqual({
            report: 'null',
            timezone: 'GMT',
            time: `${currentHourInGMT + 2}:00`
        });
    });
});
//# sourceMappingURL=weatherUtils.test.js.map