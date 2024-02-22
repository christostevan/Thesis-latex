interface monthlyAverage {
    [year: number]: {
        temperature: { [month: number]: number };
        precipitation: { [month: number]: number };
      };
}

/**
 * calculatePerMonth - responsible for calculating daily data to monlty data..
 * @param data in Json format. recieves dates, temperatures and precipitation. 
 * @returns Json objects uncluding years, with monthly temperatures and precipitation.
 */
export function calculatePerMonth(data: any) {
    const byYearAndMonth: { [year: number]: { [month: number]: { temperature: number[]; precipitation: number[] } } } = {}; // Create an object to store values grouped by month

    // Goes through the array and corresponding arrays
    for (let i = 0; i < data.time.length; i++) {
        const date = new Date(data.time[i]);
        const year = date.getFullYear();
        const month = date.getMonth(); // Get the month (0 - January, 1 - February, ..., 11 - December)
        const temperature = data.temperature_2m_mean[i];
        const precipitation = data.precipitation_sum[i];

        
        if (!byYearAndMonth[year]) { // Check if current date does not exist.
            byYearAndMonth[year] = {};
        }
      
        if (!byYearAndMonth[year][month]) { // Check if current date does not exist.
            byYearAndMonth[year][month] = { temperature: [temperature], precipitation: [precipitation] };
          } else {
            byYearAndMonth[year][month].temperature.push(temperature);
            byYearAndMonth[year][month].precipitation.push(precipitation);
        }
    }

    const result : monthlyAverage = {};
    for (const year in byYearAndMonth){ // Calculate averages per month.
        const averageTemperature = calculateTempurature(byYearAndMonth[year]);
        const averagePrecipitation = calculatePrecipitation(byYearAndMonth[year]);
        result[parseInt(year)] = { // Set return value.
            temperature: averageTemperature,
            precipitation: averagePrecipitation,
          };
    }

    return result;
}

/**
 * calculateTempurature - responsible for calculating the average temperatures per month.
 * @param data in object format. recieves temperatures. 
 * @returns montly average temperatures object.
 */
export function calculateTempurature(data: any): { [month: number]: number } {
    const averages: { [month: number]: number } = {}; // Create an object to store average temperatures per month
  
    for (const month in data) {
      const temperatures = data[month].temperature;
      const sum = temperatures.reduce((acc: number, temp: number) => acc + temp, 0); // Calculated the entire sum of the entire month
      const average = sum / temperatures.length;
      const averageOneDecimal = parseFloat(average.toFixed(1));
      averages[parseInt(month)] = averageOneDecimal;
    }
  
    return averages;
}

/**
 * calculatePrecipitation - responsible for calculating the average precipitation per month.
 * @param data in object format. recieves precipitations. 
 * @returns montly average precipitation object.
 */
  export function calculatePrecipitation(data: any): { [month: number]: number } {
    const averages: { [month: number]: number } = {}; // Create an object to store average precipitation per month
  
    for (const month in data) {
      const precipitations = data[month].precipitation;
      const sum = precipitations.reduce((acc: number, temp: number) => acc + temp, 0); // Calculated the entire sum of the entire month
      const average = sum / precipitations.length;
      const averageOneDecimal = parseFloat(average.toFixed(1));
      averages[parseInt(month)] = averageOneDecimal;
    }
  
    return averages;
}