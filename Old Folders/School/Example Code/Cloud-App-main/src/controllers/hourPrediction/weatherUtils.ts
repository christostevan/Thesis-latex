/**
 * processData - this function will get the current time and uses processWeatherConditions to check for extreme weather conditions
 * @param data in processData is the JSON-format
 * @returns JSON-format with determined weather conditions.
 */
export function processData(data: any) {

    const currentHour = new Date().getUTCHours();
    const hourlyData = data.hourly.time;

    let timeID = null;
    for (let i = 0; i < hourlyData.length; i++) {
        const date = new Date(hourlyData[i]);
        const hour = date.getUTCHours(); // Get standard UCT time

        if (hour === currentHour) {
            timeID = i;
            break;
        }
    }
    let processedWeatherData = null;
    if (timeID !== null) {
        processedWeatherData = processWeatherConditions(timeID, data.hourly); //Send gathered data for processing current hour  
        if (processedWeatherData.report == 'null') {
            timeID = timeID + 1;
            processedWeatherData = processWeatherConditions((timeID), data.hourly); //Send gathered data for processing next hour  
        }
    }

    return processedWeatherData;
};

/**
 * processWeatherConditions - this function will check for extreme weather conditions, if conditions are not met, report is set to null
 * @param data in processWeatherConditions is number and JSON-format
 * @returns JSON-format with weather condition result.
 */
export function processWeatherConditions(ID: number, data: any) {
    let weatherReport;

    //check gathered data for weather conditions
    if (data.snowfall[ID] >= 50) {
        weatherReport = {
            report: 'Heavy snowfall',
            timezone: 'GMT',
            time: `${ID - 1}:00`
        };
    } else if (data.rain[ID] >= 0.1 && (data.temperature_2m[ID] <= 0)) {
        weatherReport = {
            report: 'Hail',
            timezone: 'GMT',
            time: `${ID - 1}:00`
        };
    } else if (data.rain[ID] >= 10) {
        weatherReport = {
            report: 'Heavy rain',
            timezone: 'GMT',
            time: `${ID - 1}:00`
        };
    } else {
        weatherReport = {
            report: 'null',
            timezone: 'GMT',
            time: `${ID - 1}:00`
        };
    }

    return weatherReport;
}