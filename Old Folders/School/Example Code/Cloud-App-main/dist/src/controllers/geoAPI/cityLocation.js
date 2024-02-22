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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cityFetch = void 0;
const axios_1 = __importDefault(require("axios"));
function cityFetch(city) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (city === '' || city === null) {
                throw new Error("City cannot be null");
            }
            const url = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
            const response = yield axios_1.default.get(url);
            const data = response.data;
            if (data && data.results && data.results.length > 0) {
                const coordinates = {
                    longitude: data.results[0].longitude,
                    latitude: data.results[0].latitude
                };
                return coordinates;
            }
            throw new Error("City location cannot be gathered");
        }
        catch (error) {
            return 'An error occurred while fetching the location data.';
        }
    });
}
exports.cityFetch = cityFetch;
;
//# sourceMappingURL=cityLocation.js.map