import { Request, Response } from 'express';
import { cityFetch } from './geoAPI/cityLocation';
import axios from 'axios';

/**
 * weatherForecast - responsible for analysing location and respond with a forecast of the given amount of days.
 * @param data in weatherForecast format from HTTP-request. Gather longitude, latitude, amount of days to forecast(max 16 days). 
 * @returns Weather alarm object
 */
export const weatherForecast = async (req: Request, res: Response) => {
    try {
        const city: string = req.query.city as string; // Specify the type as string
        const days: number = parseInt(req.query.days as string); // Specify the type as number

        const cityLocation = await cityFetch(city);

        if (typeof cityLocation === 'string') {
            throw new Error(cityLocation); // Re-throw the error as an exception
        }

        const { longitude, latitude } = cityLocation;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${cityLocation.latitude}&longitude=${cityLocation.longitude}&daily=temperature_2m_max,temperature_2m_min,windspeed_10m_max,winddirection_10m_dominant&timezone=auto&forecast_days=${days}`;
        const response = await axios.get(url);
        const data = response.data;
        console.log(data.daily);
  
       res.json(data.daily);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching the weather data.' });
    }
};