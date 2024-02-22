import { Request, Response } from 'express';
import axios from 'axios';
import { processNextDayWeather } from './nextDayPrediction/weatherCalculator'; // import classes for nextDayWeather
import { processData } from './hourPrediction/weatherUtils'; // import classes for currentWeather
import { cityFetch } from './geoAPI/cityLocation';

/**
 * nextDayWeather - responsible for analysing location and respond with possibility of heat conditions, within the next day.
 * @param data in nextDayWeather format from HTTP-request. Gather longitude, latitude.
 * @returns Weather alarm object
 */
export const nextDayWeather = async (req: Request, res: Response) => {
    try {
        const city: string = req.query.city as string; // Specify the type as string
        const cityLocation = await cityFetch(city);

        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation); // Re-throw the error as an exception
        }

        const { longitude, latitude } = cityLocation;

        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 1);
        const tomorrowDate = currentDate.toISOString().slice(0, 10);

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&hourly=temperature_2m,soil_temperature_54cm&start_date=${tomorrowDate}&end_date=${tomorrowDate}`;
        const response = await axios.get(url);
        const data = response.data;

        const processedData = await processNextDayWeather(data.hourly); //Send gathered data for processing and get weather report.  
           
        res.json(processedData); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
};
/**
 * currentWeather - responsible for analysing location and respond with possibility of extreme weather conditions, within current and next hour.
 * @param data in currenWeather format from HTTP-request. Gather longitude, latitude.
 * @returns Weather alarm object
 */
export const currentWeather = async (req: Request, res: Response) => {
    try {
        const city: string = req.query.city as string; // Specify the type as string
        const cityLocation = await cityFetch(city);

        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation); // Re-throw the error as an exception
        }

        const { longitude, latitude } = cityLocation;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&hourly=temperature_2m,rain,snowfall&timezone=auto&forecast_days=1`;
        const response = await axios.get(url);
        const data = response.data;

        const processedData = await processData(data); //Send gathered data for processing and get weather report.     

        res.json(processedData); 
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
};