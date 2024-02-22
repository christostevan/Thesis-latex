import { Request, Response } from 'express';
import { cityFetch } from './geoAPI/cityLocation';
import { calculatePerMonth } from './historyCalculator/monthCalculator';
import { determineDates } from './historyCalculator/dateCalculator';
import axios from 'axios';

/**
 * weatherHistory - responsible for analysing the historical dat from a location and respond with daily data of the given amount of years.
 * @param data in weatherForecast format from HTTP-request. Gather the city name. 
 * @returns Weather history object
 */
export const weatherHistory = async (req: Request, res: Response) => {
    try {
        const city: string = req.query.city as string; // Specify the type as string

        const cityLocation = await cityFetch(city);

        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation); // Re-throw the error as an exception
        }

        const today = new Date();
        const date = determineDates(today); // Set dates for the url request.

        const { longitude, latitude } = cityLocation;

        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&start_date=${date.startDate}&end_date=${date.endDate}&daily=temperature_2m_mean,precipitation_sum&timezone=GMT`;
        const response = await axios.get(url);
        const data = response.data;
  
        res.json(data); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
};

/**
 * weatherHistoryPerMonth - responsible for analysing the historical dat from a location and respond with montly data of the given amount of years.
 * @param data in weatherForecast format from HTTP-request. Gather the city name. 
 * @returns Weather history object
 */
export const weatherHistoryPerMonth = async (req: Request, res: Response) => {
    try {
        const city: string = req.query.city as string; // Specify the type as string

        const cityLocation = await cityFetch(city);

        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation); // Re-throw the error as an exception
        }

        const today = new Date();
        const date = determineDates(today); // Set dates for the url request.

        const { longitude, latitude } = cityLocation;

        const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&start_date=${date.startDate}&end_date=${date.endDate}&daily=temperature_2m_mean,precipitation_sum&timezone=GMT`;
        const response = await axios.get(url);
        const data = response.data;

        const result = await calculatePerMonth(data.daily); // Compact daily information into monthly

        console.log(result);
        
        res.json(result); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
};

