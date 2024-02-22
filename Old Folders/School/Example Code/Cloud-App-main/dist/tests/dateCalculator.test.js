"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const dateCalculator = require('../src/controllers/historyCalculator/dateCalculator');
describe('determineDates', () => {
    it('should return end and start date from last month to 20 years ago', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '2023-07-21T12:53:06.732Z';
        const result = yield dateCalculator.determineDates(input);
        const expectedResponse = {
            endDate: '2023-06-30',
            startDate: '2003-07-01'
        };
        expect(result).toEqual(expectedResponse);
    }));
    it('should return end and start date from the last completed month during before the set date to 20 years before.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '2023-04-21T12:53:06.732Z';
        const result = yield dateCalculator.determineDates(input);
        const expectedResponse = {
            endDate: '2023-03-28',
            startDate: '2003-04-01'
        };
        expect(result).toEqual(expectedResponse);
    }));
    it('should return end and start date from the last completed month during a leapyear before the set date to 20 years before.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '2020-04-21T12:53:06.732Z';
        const result = yield dateCalculator.determineDates(input);
        const expectedResponse = {
            endDate: '2020-03-29',
            startDate: '2000-04-01'
        };
        expect(result).toEqual(expectedResponse);
    }));
});
describe('determineMonth', () => {
    it('should return false month number.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '1';
        const result = yield dateCalculator.determineMonth(input);
        const expectedResponse = false;
        expect(result).toEqual(expectedResponse);
    }));
    it('should return true month number.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '4';
        const result = yield dateCalculator.determineMonth(input);
        const expectedResponse = true;
        expect(result).toEqual(expectedResponse);
    }));
    it('should return false month number.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '13';
        const result = yield dateCalculator.determineMonth(input);
        const expectedResponse = false;
        expect(result).toEqual(expectedResponse);
    }));
});
describe('determineLeapYear', () => {
    it('should return true as it is a leap year.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '2020';
        const result = yield dateCalculator.determineLeapYear(input);
        const expectedResponse = true;
        expect(result).toEqual(expectedResponse);
    }));
    it('should return false as it is not a leap year.', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '2023';
        const result = yield dateCalculator.determineLeapYear(input);
        const expectedResponse = false;
        expect(result).toEqual(expectedResponse);
    }));
});
//# sourceMappingURL=dateCalculator.test.js.map