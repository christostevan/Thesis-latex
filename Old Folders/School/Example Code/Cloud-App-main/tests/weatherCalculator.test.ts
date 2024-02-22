//const axios = require('axios');
const weatherCalculator = require('../src/controllers/nextDayPrediction/weatherCalculator');

describe('scanTemperature', () => {
    it('should return high temperature weather report for the next day.', () => {
        const input = {
            0: 24, 1: 23.8, 2: 23.5, 3: 23.9, 4: 23.7,
            5: 23.7, 6: 23.2, 7: 24.2, 8: 25, 9: 25.8,
            10: 26.9, 11: 28.1, 12: 29.9, 13: 31.3, 14: 31.7,
            15: 32.8, 16: 32.9, 17: 32.5, 18: 31.7, 19: 30.5,
            20: 28.4, 21: 25.7, 22: 25, 23: 24.3
        }

        const result = weatherCalculator.scanTemperature(input);
        const expectedResponse = true;

        expect(result).toEqual( expectedResponse );
    });

    it('should return low temperature weather report for the next day', () => {
        const input = {
            0: 24, 1: 23.8, 2: 23.5, 3: 23.9, 4: 23.7,
            5: 23.7, 6: 23.2, 7: 24.2, 8: 24, 9: 23.8,
            10: 23.9, 11: 23.1, 12: 22.9, 13: 21.3, 14: 21.7,
            15: 22.8, 16: 22.9, 17: 12.5, 18: 11.7, 19: 10.5,
            20: 22.4, 21: 22.7, 22: 22, 23: 24.3
            
        }

        const result = weatherCalculator.scanTemperature(input);
        const expectedResponse = false;

        expect(result).toEqual( expectedResponse );
    });
});

describe('scanSoilFrost', () => {
    it('should return high soil temperature report for the next day.', () => {
        const input = {
            0: 24, 1: 23.8, 2: 23.5, 3: 23.9, 4: 23.7,
            5: 23.7, 6: 23.2, 7: 24.2, 8: 25, 9: 25.8,
            10: 26.9, 11: 28.1, 12: 29.9, 13: 31.3, 14: 31.7,
            15: 32.8, 16: 32.9, 17: 32.5, 18: 31.7, 19: 30.5,
            20: 28.4, 21: 25.7, 22: 25, 23: 24.3        
        }

        const result = weatherCalculator.scanSoilFrost(input);
        const expectedResponse = false;

        expect(result).toEqual( expectedResponse );
    });

    it('should return high soil temperature  report for the next day', () => {
        const input = {
            0: 24, 1: 23.8, 2: 23.5, 3: 23.9, 4: 23.7,
            5: 23.7, 6: 23.2, 7: 0, 8: 0, 9: -4,
            10: 23.9, 11: 23.1, 12: 22.9, 13: 21.3, 14: 21.7,
            15: 22.8, 16: 22.9, 17: 12.5, 18: 11.7, 19: 10.5,
            20: 22.4, 21: 22.7, 22: 22, 23: 24.3
            
        }

        const result = weatherCalculator.scanSoilFrost(input);
        const expectedResponse = true;

        expect(result).toEqual( expectedResponse );
    });
});

describe('processNextDayWeather', () => {
    it('should return low temperature and high soil temperature report for the next day', () => {
        const input = {
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
              12.9, 12.7, 12.8, 12.8, 12.9,
              13.4, 14.6, 16.5, 18.1, 19.3,
              20.2, 20.7, 21.8, 22.2, 22.8,
              22.4, 22.4, 22.1, 20.8, 19.1,
              17.4, 16.4, 15.7,   15
            ],
            soil_temperature_54cm: [
              17.7, 17.7, 17.6, 17.6,
              17.5, 17.5, 17.4, 17.3,
              17.3, 17.3, 17.2, 17.2,
              17.2, 17.2, 17.2, 17.3,
              17.3, 17.3, 17.4, 17.4,
              17.5, 17.5, 17.5, 17.5
            ]
          }

        const result = weatherCalculator.processNextDayWeather(input);
        const expectedResponse = {
            result: false
        };

        expect(result).toEqual( expectedResponse );
    });

    it('should return high temperature weather report for the next day', () => {
        const input = {
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
              12.9, 12.7, 12.8, 12.8, 12.9,
              13.4, 14.6, 16.5, 18.1, 19.3,
              20.2, 20.7, 25.8, 26.2, 22.8,
              22.4, 22.4, 22.1, 20.8, 19.1,
              17.4, 16.4, 15.7,   15
            ],
            soil_temperature_54cm: [
              17.7, 17.7, 17.6, 17.6,
              17.5, 17.5, 17.4, 17.3,
              17.3, 17.3, 17.2, 17.2,
              17.2, 17.2, 17.2, 17.3,
              17.3, 17.3, 17.4, 17.4,
              17.5, 17.5, 17.5, 17.5
            ]
          }

        const result = weatherCalculator.processNextDayWeather(input);
        const expectedResponse = {
            result: true,
            type: "Temperature",
        };

        expect(result).toEqual( expectedResponse );
    });

    it('should return low soil temperature report for the next day', () => {
        const input = {
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
          }

        const result = weatherCalculator.processNextDayWeather(input);
        const expectedResponse = {
                result: true,
                type: "Soil frost",
            };

        expect(result).toEqual( expectedResponse );
    });
});
