"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.determineLeapYear = exports.determineMonth = exports.determineDates = void 0;
function determineDates(data) {
    const endDate = new Date(data);
    endDate.setMonth(endDate.getMonth() - 1);
    if (endDate.getMonth() === 2) {
        if (determineLeapYear(endDate.getFullYear())) {
            endDate.setDate(29);
        }
        else {
            endDate.setDate(28);
        }
    }
    else {
        if (determineMonth(endDate.getMonth())) {
            endDate.setDate(31);
        }
        else {
            endDate.setDate(30);
        }
    }
    const startDate = new Date(data);
    startDate.setFullYear(startDate.getFullYear() - 20);
    const result = {
        endDate: endDate.toISOString().split('T')[0],
        startDate: startDate.toISOString().split('T')[0]
    };
    return result;
}
exports.determineDates = determineDates;
function determineMonth(month) {
    const isMonthTrue = [
        true, false, true,
        false, true, false,
        true, true, false,
        true, false, true,
    ];
    if (month >= 0 && month <= 11) {
        return isMonthTrue[month];
    }
    else {
        return false;
    }
}
exports.determineMonth = determineMonth;
function determineLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}
exports.determineLeapYear = determineLeapYear;
;
//# sourceMappingURL=dateCalculator.js.map