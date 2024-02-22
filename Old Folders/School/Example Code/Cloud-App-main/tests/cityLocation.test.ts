const cityLocation = require('../src/controllers/geoAPI/cityLocation');
const cityAxios = require('axios');

describe('cityFetch', () => {
    it('should return coordintes of Emmen', async () => {
        const input = 'Emmen';

        const result = await cityLocation.cityFetch(input);
        const expectedResponse = { 
            latitude: 52.77917, 
            longitude: 6.90694
        };

        expect(result).toEqual( expectedResponse );
    });

    it('should return coordintes of Amsterdam', async () => {
        const input = 'Amsterdam';

        const result = await cityLocation.cityFetch(input);
        const expectedResponse = { 
            latitude: 52.37403,
            longitude: 4.88969
        };

        expect(result).toEqual( expectedResponse );
    });

    it('should return error: city cannot be null', async () => {
        const input = '';

        try {
            await cityLocation.cityFetch(input);
          } catch (error: any) {
            expect(error.message).toBe('City cannot be null');
          }
    });

    it('should return error: An error occurred while fetching the location data', async () => {
        const input = 'testCity'; 

        jest.spyOn(cityAxios, 'get').mockImplementation(() => {
            throw new Error('Network Error');
        });

        const result = await cityLocation.cityFetch(input);

        expect(result).toBe('An error occurred while fetching the location data.');
    });
});

