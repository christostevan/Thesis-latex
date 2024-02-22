/**
 * determineDates - responsible for gathering the start and end date for the historical requist.
 * @param data in date format. recieves date. 
 * @returns coordinates object.
 */
export function determineDates(data: Date) {
    const endDate = new Date(data);

    endDate.setMonth(endDate.getMonth() - 1); // Set end month to last completed month.

    if (endDate.getMonth() === 2) { // Determine last date of completed month.
        if (determineLeapYear(endDate.getFullYear())) {
            endDate.setDate(29);
        } else {
            endDate.setDate(28);
        }
    } else {
        if (determineMonth(endDate.getMonth())) {
            endDate.setDate(31);
        } else {
            endDate.setDate(30);
        }
    }

    const startDate = new Date(data);

    startDate.setFullYear(startDate.getFullYear() - 20); // Set startdate from 20 years ago.
    startDate.setDate(1);

    const result = { // Assemble return value.
        endDate: endDate.toISOString().split('T')[0],
        startDate: startDate.toISOString().split('T')[0]
    }

    return result
}

/**
 * determineMonth - responsible for determining which days does a month has.
 * @param month in true or false. 
 * @returns true or false.
 */
export function determineMonth(month: number): boolean {
    const isMonthTrue = [
        true, false, true, // Jan, Feb,  Mar
        false, true, false,  // Apr, May, Jun
        true, true, false,  // Jul, Aug, Sep
        true, false, true,   // Oct, Nov, Dec
    ];
  
    if (month >= 0 && month <= 11) {
        return isMonthTrue[month];
    } else {
        return false;
    }
}
/**
 * determineLeapYear - responsible for determining if it is a leap year or not.
 * @param year in int.
 * @returns boolean.
 */
export function determineLeapYear(year: number): boolean {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};