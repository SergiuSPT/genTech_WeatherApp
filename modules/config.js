export const CONFIG = {
  API_KEY: 'your_api_key_here', // Înlocuiește cu cheia ta de la https://openweathermap.org/api
  API_BASE_URL: 'https://api.openweathermap.org/data/2.5',
  DEFAULT_UNITS: 'metric', // 'metric' pentru °C, 'imperial' pentru °F
  DEFAULT_LANG: 'ro'       // Limba răspunsului (ro = română)
};

export const API_ENDPOINTS = {
  CURRENT_WEATHER: '/weather',    // Vremea curentă
  FORECAST: '/forecast',          // Prognoză (poți adăuga și altele)
  AIR_POLLUTION: '/air_pollution' // Calitatea aerului, dacă ai nevoie
};

export const ERROR_MESSAGES = {
  CITY_NOT_FOUND: 'Orașul introdus nu a fost găsit. Te rugăm verifică numele.',
  NETWORK_ERROR: 'Eroare de rețea. Verifică conexiunea la internet.',
  INVALID_API_KEY: 'Cheie API invalidă. Verifică setările.',
  UNKNOWN_ERROR: 'A apărut o eroare necunoscută. Încearcă din nou.'
};