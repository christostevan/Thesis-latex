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
const alarmAxios = require('axios');
const weatherAlarm = require('../src/controllers/weatherAlarm');
describe('nextDayWeather', () => {
    it('should return weather report for no conditions met', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
                generationtime_ms: 1.278996467590332,
                utc_offset_seconds: -14400,
                timezone: 'America/New_York',
                timezone_abbreviation: 'EDT',
                elevation: 51,
                hourly_units: { time: 'iso8601', temperature_2m: '°C', rain: 'mm', snowfall: 'cm' },
                hourly: {
                    time: [
                        '2023-07-18T00:00', '2023-07-18T01:00',
                        '2023-07-18T02:00', '2023-07-18T03:00',
                        '2023-07-18T04:00', '2023-07-18T05:00',
                        '2023-07-18T06:00', '2023-07-18T07:00',
                        '2023-07-18T08:00', '2023-07-18T09:00',
                        '2023-07-18T10:00', '2023-07-18T11:00',
                        '2023-07-18T12:00', '2023-07-18T13:00',
                        '2023-07-18T14:00', '2023-07-18T15:00',
                        '2023-07-18T16:00', '2023-07-18T17:00',
                        '2023-07-18T18:00', '2023-07-18T19:00',
                        '2023-07-18T20:00', '2023-07-18T21:00',
                        '2023-07-18T22:00', '2023-07-18T23:00'
                    ],
                    temperature_2m: [
                        13, 12.7, 12.5, 12.4, 12.5, 13.2,
                        14.6, 16.2, 17.9, 19.4, 20.7, 21.6,
                        22.2, 22.7, 22.4, 22.5, 21.2, 21.5,
                        20.8, 18.4, 16.8, 15.8, 15.2, 14.
                    ],
                    soil_temperature_54cm: [
                        17.7, 17.7, 17.6, 17.6,
                        17.5, 17.5, 17.4, 17.3,
                        17.3, 17.3, 17.2, 17.2,
                        17.2, 17.2, 17.2, 17.3,
                        17.3, 17.3, 17.4, 17.4,
                        17.5, 17.5, 17.5, 17.5
                    ]
                },
            },
        });
        yield weatherAlarm.nextDayWeather(req, res);
        const expectedResponse = {
            result: false,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
});
describe('weatherAlarm', () => {
    it('should return weather report for no extreme weather conditions', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
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
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
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
                },
            },
        });
        yield weatherAlarm.currentWeather(req, res);
        const currentHourInGMT = new Date().getUTCHours();
        const expectedResponse = {
            report: 'null',
            timezone: 'GMT',
            time: `${currentHourInGMT + 2}:00`,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
    it('should return weather report for soil frost conditions', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
                generationtime_ms: 1.278996467590332,
                utc_offset_seconds: -14400,
                timezone: 'America/New_York',
                timezone_abbreviation: 'EDT',
                elevation: 51,
                hourly_units: { time: 'iso8601', temperature_2m: '°C', rain: 'mm', snowfall: 'cm' },
                hourly: {
                    time: [
                        '2023-07-18T00:00', '2023-07-18T01:00',
                        '2023-07-18T02:00', '2023-07-18T03:00',
                        '2023-07-18T04:00', '2023-07-18T05:00',
                        '2023-07-18T06:00', '2023-07-18T07:00',
                        '2023-07-18T08:00', '2023-07-18T09:00',
                        '2023-07-18T10:00', '2023-07-18T11:00',
                        '2023-07-18T12:00', '2023-07-18T13:00',
                        '2023-07-18T14:00', '2023-07-18T15:00',
                        '2023-07-18T16:00', '2023-07-18T17:00',
                        '2023-07-18T18:00', '2023-07-18T19:00',
                        '2023-07-18T20:00', '2023-07-18T21:00',
                        '2023-07-18T22:00', '2023-07-18T23:00'
                    ],
                    temperature_2m: [
                        2.9, 2.7, 2.8, 2.8, 2.9,
                        3.4, 4.6, 6.5, 8.1, 9.3,
                        10.2, 10.7, 11.8, 12.2, 12.8,
                        12.4, 12.4, 12.1, 10.8, 9.1,
                        7.4, 6.4, 5.7, 5
                    ],
                    soil_temperature_54cm: [
                        2.9, 2.7, 2.8, 2.8, 2.9,
                        3.4, -4.6, -6.5, 8.1, 9.3,
                        0.2, 0.7, 1.8, 2.2, 2.8,
                        2.4, 2.4, 2.1, 0.8, 0.1,
                        -0.4, -0.4, 5.7, 5
                    ]
                },
            },
        });
        yield weatherAlarm.nextDayWeather(req, res);
        const expectedResponse = {
            result: true,
            type: "Soil frost",
        };
    }));
});
describe('weatherAlarm', () => {
    it('should return weather report for no extreme weather conditions', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
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
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
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
                },
            },
        });
        yield weatherAlarm.currentWeather(req, res);
        const currentHourInGMT = new Date().getUTCHours();
        const expectedResponse = {
            report: 'null',
            timezone: 'GMT',
            time: `${currentHourInGMT + 2}:00`,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
    it('should return weather report for hail', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
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
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        28.4, 25.7, 25, 24.3
                    ],
                    rain: [
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 1, 1, 1, 1, 1, 1, 1,
                        1, 1, 1, 1, 0, 0, 0, 0
                    ],
                    snowfall: [
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0
                    ]
                },
            },
        });
        yield weatherAlarm.currentWeather(req, res);
        const currentHourInGMT = new Date().getUTCHours();
        const expectedResponse = {
            report: 'Hail',
            timezone: 'GMT',
            time: `${currentHourInGMT + 1}:00`,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
    it('should return weather report for Heavy rain', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
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
                        20, 20, 20, 20, 20,
                        20, 20, 20, 20, 20,
                        20, 20, 20, 20, 20,
                        28.4, 25.7, 25, 24.3
                    ],
                    rain: [
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 20, 20, 20, 20, 20, 20, 20,
                        20, 20, 20, 20, 0, 0, 0, 0
                    ],
                    snowfall: [
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0
                    ]
                },
            },
        });
        yield weatherAlarm.currentWeather(req, res);
        const currentHourInGMT = new Date().getUTCHours();
        const expectedResponse = {
            report: 'Heavy rain',
            timezone: 'GMT',
            time: `${currentHourInGMT + 1}:00`,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
    it('should return weather report for Heavy snowfall', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = {
            query: {
                latitude: 40.710335,
                longitude: -73.99307,
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        jest.spyOn(alarmAxios, 'get').mockResolvedValue({
            data: {
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
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0,
                        28.4, 25.7, 25, 24.3
                    ],
                    rain: [
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0,
                        0, 0, 0, 0, 0, 0, 0, 0
                    ],
                    snowfall: [
                        0, 0, 0, 0, 0, 60, 60, 60,
                        60, 60, 60, 60, 60, 60, 60, 60,
                        60, 60, 60, 60, 60, 0, 0, 0
                    ]
                },
            },
        });
        yield weatherAlarm.currentWeather(req, res);
        const currentHourInGMT = new Date().getUTCHours();
        const expectedResponse = {
            report: 'Heavy snowfall',
            timezone: 'GMT',
            time: `${currentHourInGMT + 1}:00`,
        };
        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    }));
});
//# sourceMappingURL=weatherAlarm.test.js.map