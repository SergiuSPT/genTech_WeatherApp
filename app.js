import * as ui from './modules/ui-controller.js';
import { getCurrentWeather } from './modules/weather-service.js';

const isValidCity = (city) => {
    return city.length >= 2 && /^[a-zA-ZăâîșțĂÂÎȘȚ\s-]+$/.test(city);
};

const handleSearch = async (e) => {
    e.preventDefault(); // prevenim reîncărcarea paginii

    const city = ui.getCityInput();
    if (!isValidCity(city)) {
        ui.showError("Numele orașului este invalid.");
        return;
    }

    ui.showLoading();
    try {
        const data = await getCurrentWeather(city);
        ui.displayWeather(data);
    } catch (err) {
        ui.showError("Nu s-au găsit informații pentru orașul introdus.");
    } finally {
        ui.hideLoading();
        ui.clearInput();
    }
};

const setupEventListeners = () => {
    ui.searchBtn.addEventListener('click', handleSearch);

    // Permite submit și prin apăsarea Enter
    ui.elements.cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleSearch(e);
    });
};

// Pornirea aplicației
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
});

