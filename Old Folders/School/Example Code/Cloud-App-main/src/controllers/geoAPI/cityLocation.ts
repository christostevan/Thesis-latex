import axios from "axios";

/**
 * cityFetch - responsible for gathering the coordinates of the inserted city name.
 * @param data in string format. Gathers the city name. 
 * @returns coordinates object.
 */
export async function cityFetch(city: String) {
    try {
        if (city === '' || city === null) { 
            throw new Error("City cannot be null");
        }

        const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const response = await axios.get(url);
        const data = response.data;

        if (data && data.results && data.results.length > 0) { // Set coordinates in object.
            const coordinates = { 
                longitude: data.results[0].longitude,
                latitude: data.results[0].latitude
            };
            return coordinates;
        }

        throw new Error("City location cannot be gathered");
    }
    catch (error) {
        return 'An error occurred while fetching the location data.' ;
    }
};