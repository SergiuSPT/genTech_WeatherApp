export const MOCK_DATA = {
    coord: {
        lon: 26.1,
        lat: 44.43
    },
    weather: [
        {
            id: 800,
            main: "Clear",
            description: "clear sky",
            icon: "01d"
        }
    ],
    base: "stations",
    main: {
        temp: 296.15,         // temperatura în Kelvin
        feels_like: 295.86,
        temp_min: 295.15,
        temp_max: 297.15,
        pressure: 1013,
        humidity: 40
    },
    visibility: 10000,
    wind: {
        speed: 4.63,
        deg: 70
    },
    clouds: {
        all: 0
    },
    dt: 1681399073,           // timestamp
    sys: {
        type: 2,
        id: 2007684,
        country: "RO",
        sunrise: 1681358073,
        sunset: 1681406495
    },
    timezone: 10800,
    id: 683506,
    name: "Bucharest",
    cod: 200
};
