import * as ui from './modules/ui-controller.js';
import { getCurrentWeather } from './modules/weather-service.js';
import { CONFIG, API_ENDPOINTS, ERROR_MESSAGES } from './modules/config.js';
import { getCoords } from './modules/location-service.js';
import { getWeatherByCoords } from './modules/weather-service.js';
import {
  getElements,
  saveUserPreferences,
  loadUserPreferences,
  updateTemperatureDisplay
} from './modules/ui-controller.js';

import {
  getElements,
  displayWeather,
  showError,
  showLoading,
  showMessage,
  saveUserPreferences,
  loadUserPreferences,
  updateTemperatureDisplay
} from './modules/ui-controller.js'

getCoords()
  .then((coords) =>
    getWeatherByCoords(coords.latitude, coords.longitude)
  )
  .then((weather) => {
    console.log('Weather pentru locația ta:', weather);
  })
  .catch((err) => console.error(err.message));

console.log(CONFIG.API_BASE_URL + API_ENDPOINTS.CURRENT_WEATHER);
console.log(ERROR_MESSAGES.CITY_NOT_FOUND);

const elements = getElements()
const preferences = loadUserPreferences()
CONFIG.DEFAULT_UNITS = preferences.unit
CONFIG.DEFAULT_LANG = preferences.lang

// Setează select-urile cu valorile salvate
elements.unitSelect.value = preferences.unit
elements.langSelect.value = preferences.lang


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

