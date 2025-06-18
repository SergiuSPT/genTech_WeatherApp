import { MOCK_DATA } from './config.js';

// Funcție auxiliară pentru simularea delay-ului
const simulateDelay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getCurrentWeather = async (city) => {
    try {
        await simulateDelay(1000); // Simulăm delay-ul API
        const data = { ...MOCK_DATA, name: city }; // Copiem MOCK_DATA și înlocuim orașul
        return data;
    } catch (error) {
        throw new Error("Eroare la obținerea datelor despre vreme (nume oraș)");
    }
};

export const getWeatherByCoords = async (lat, lon) => {
    try {
        await simulateDelay(1000); // Simulăm delay-ul API
        const data = {
            ...MOCK_DATA,
            coord: { lat, lon },
            name: `(${lat.toFixed(2)}, ${lon.toFixed(2)})`
        };
        return data;
    } catch (error) {
        throw new Error("Eroare la obținerea datelor despre vreme (coordonate)");
    }
};
