// Selectăm toate elementele necesare o singură dată
export const elements = {
    cityInput: document.getElementById('city-input'),
    searchBtn: document.getElementById('search-btn'),
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    weatherDisplay: document.getElementById('weather-display'),
    temperature: document.getElementById('temperature'),
    humidity: document.getElementById('humidity'),
    wind: document.getElementById('wind'),
    description: document.getElementById('description'),
    cityName: document.getElementById('city-name'),
};

// Funcții UI
export const showLoading = () => {
    elements.loading.style.display = 'block';
    elements.error.style.display = 'none';
    elements.weatherDisplay.style.display = 'none';
};

export const hideLoading = () => {
    elements.loading.style.display = 'none';
};

export const showError = (msg = "A apărut o eroare.") => {
    elements.error.textContent = msg;
    elements.error.style.display = 'block';
    elements.weatherDisplay.style.display = 'none';
};

export const getCityInput = () => elements.cityInput.value.trim();

export const clearInput = () => {
    elements.cityInput.value = '';
};

// Afișează datele meteo în interfață
export const displayWeather = (data) => {
    const { name, main, weather, wind } = data;

    elements.cityName.textContent = name;
    elements.temperature.textContent = `${main.temp} °C`;
    elements.humidity.textContent = `${main.humidity} %`;
    elements.wind.textContent = `${wind.speed} m/s`;
    elements.description.textContent = weather[0].description;

    elements.weatherDisplay.style.display = 'block';
    elements.error.style.display = 'none';
};

export const getElements = () => ({
  // alte elemente deja existente...
  unitSelect: document.getElementById('unit-select'),
  langSelect: document.getElementById('lang-select'),
  temperature: document.getElementById('temperature')
});

export const updateTemperatureDisplay = (elements, temperature, unit) => {
  const symbol = unit === 'metric' ? '°C' : '°F';
  elements.temperature.textContent = `${temperature}${symbol}`;
};

export const saveUserPreferences = (unit, lang) => {
  localStorage.setItem('weatherUnit', unit);
  localStorage.setItem('weatherLang', lang);
};

export const loadUserPreferences = () => ({
  unit: localStorage.getItem('weatherUnit') || 'metric',
  lang: localStorage.getItem('weatherLang') || 'ro'
});
