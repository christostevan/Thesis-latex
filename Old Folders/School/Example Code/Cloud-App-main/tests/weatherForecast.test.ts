const weatherForecast = require('../src/controllers/weatherForecast');
const forecastAxios = require('axios');
const axios = require('axios');
const { cityFetch } = require('../src/controllers/geoAPI/cityLocation');

jest.mock('axios', () => ({
    get: jest.fn()
}));

jest.mock('../src/controllers/geoAPI/cityLocation', () => ({
    cityFetch: jest.fn()
}));

// Mock the cityFetch function
describe('weatherForecast', () => {
    it('should return weather forecast of 9 days', async () => {
        const req = {
            query: {
              city: 'Amsterdam',
              days: '9',
            },
        };
        const res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
        // Mock the resolved value for cityFetch
        cityFetch.mockResolvedValue({
            longitude: 6.9,
            latitude: 52.78,
        });
        axios.get.mockResolvedValue({ //intervene on URL request to create fixed responce
            data: {
                latitude: 52.78,
                longitude: 6.9,
                generationtime_ms: 1.5850067138671875,
                utc_offset_seconds: 7200,
                timezone: 'Europe/Amsterdam',
                timezone_abbreviation: 'CEST',
                elevation: 23,
                daily_units: {
                    time: 'iso8601',
                    temperature_2m_max: '°C',
                    temperature_2m_min: '°C',
                    windspeed_10m_max: 'km/h',
                    winddirection_10m_dominant: '°'
                },
                daily: {
                    time: [
                        '2023-07-19',
                        '2023-07-20',
                        '2023-07-21',
                        '2023-07-22',
                        '2023-07-23',
                        '2023-07-24',
                        '2023-07-25',
                        '2023-07-26',
                        '2023-07-27'
                    ],
                    temperature_2m_max: [
                        19.5, 19.8, 18.6,
                        17.1,   20, 17.3,
                        18.4, 19.7, 17.1
                    ],
                    temperature_2m_min: [
                        14.9, 12.2, 11.6,
                        9.3, 14.2, 13.4,
                        12.1, 10.3, 13.5
                    ],
                    windspeed_10m_max: [
                        14.8,  9.1, 14.4,
                        13.8, 20.7, 22.1,
                        13, 21.4,   32
                    ],
                    winddirection_10m_dominant: [
                        280, 320, 277,
                        221, 202, 254,
                        293, 229, 214
                    ]
                }  
            },
        });

        await weatherForecast.weatherForecast(req, res);

        const expectedResponse = {
            time: [
              '2023-07-19',
              '2023-07-20',
              '2023-07-21',
              '2023-07-22',
              '2023-07-23',
              '2023-07-24',
              '2023-07-25',
              '2023-07-26',
              '2023-07-27'
            ],
            temperature_2m_max: [
              19.5, 19.8, 18.6,
              17.1,   20, 17.3,
              18.4, 19.7, 17.1
            ],
            temperature_2m_min: [
              14.9, 12.2, 11.6,
               9.3, 14.2, 13.4,
              12.1, 10.3, 13.5
            ],
            windspeed_10m_max: [
              14.8,  9.1, 14.4,
              13.8, 20.7, 22.1,
                13, 21.4,   32
            ],
            winddirection_10m_dominant: [
              280, 320, 277,
              221, 202, 254,
              293, 229, 214
            ]
        };

        expect(res.json).toHaveBeenCalledWith(expectedResponse);
        expect(res.status).not.toHaveBeenCalledWith(500);
    });

    it('should return error for the weather forecast', async () => {
        forecastAxios.get.mockRejectedValue(new Error('Simulated error'));

        const req = {
            query: {
            longitude: 0,
            latitude: 0,
            days: 5,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await weatherForecast.weatherForecast(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching the weather data.' });
    });

    it('should return an error if cityFetch returns a string', async () => {
        // Mock the resolved value for cityFetch to return a string
        cityFetch.mockResolvedValue('Error fetching city location');

        const req = {
            query: {
                city: 'Amsterdam',
                days: '9',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await weatherForecast.weatherForecast(req, res);

        expect(cityFetch).toHaveBeenCalledWith('Amsterdam');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ error: 'An error occurred while fetching the weather data.' });
    });

});