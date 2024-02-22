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
const cityLocation = require('../src/controllers/geoAPI/cityLocation');
const cityAxios = require('axios');
describe('cityFetch', () => {
    it('should return coordintes of Emmen', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = 'Emmen';
        const result = yield cityLocation.cityFetch(input);
        const expectedResponse = {
            latitude: 52.77917,
            longitude: 6.90694
        };
        expect(result).toEqual(expectedResponse);
    }));
    it('should return coordintes of Amsterdam', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = 'Amsterdam';
        const result = yield cityLocation.cityFetch(input);
        const expectedResponse = {
            latitude: 52.37403,
            longitude: 4.88969
        };
        expect(result).toEqual(expectedResponse);
    }));
    it('should return error: city cannot be null', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = '';
        try {
            yield cityLocation.cityFetch(input);
        }
        catch (error) {
            expect(error.message).toBe('City cannot be null');
        }
    }));
    it('should return error: An error occurred while fetching the location data', () => __awaiter(void 0, void 0, void 0, function* () {
        const input = 'testCity';
        jest.spyOn(cityAxios, 'get').mockImplementation(() => {
            throw new Error('Network Error');
        });
        const result = yield cityLocation.cityFetch(input);
        expect(result).toBe('An error occurred while fetching the location data.');
    }));
});
//# sourceMappingURL=cityLocation.test.js.map