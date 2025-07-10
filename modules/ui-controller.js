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
    historySection: document.querySelector('#history-section'),
    historyList: document.querySelector('#history-list'),
    clearHistoryBtn: document.querySelector('#clear-history-btn'),
};

export const showHistory = () => {
  elements.historySection.classList.remove('hidden')
}
export const hideHistory = () => {
  elements.historySection.classList.add('hidden')
}

export const renderHistory = (historyItems) => {
  if (historyItems.length === 0) {
    elements.historyList.innerHTML =
      '<p class="no-history">Nu ai căutări recente</p>'
    return
  }

  const historyHTML = historyItems
    .map((item) => {
      const timeAgo = getTimeAgo(item.timestamp)
      return `
        <div class="history-item" 
             data-city="${item.city}" 
             data-lat="${item.coordinates.lat}" 
             data-lon="${item.coordinates.lon}">
          <div class="history-location">
            <span class="city">${item.city}</span>,
            <span class="country">${item.country}</span>
          </div>
          <div class="history-time">${timeAgo}</div>
        </div>
      `
    })
    .join('')

  elements.historyList.innerHTML = historyHTML
}

const getTimeAgo = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 60) return `${minutes} minute în urmă`
  if (hours < 24) return `${hours} ore în urmă`
  return `${days} zile în urmă`
}

export const addHistoryEventListeners = (onHistoryClick, onClearHistory) => {
  elements.historyList.addEventListener('click', (e) => {
    const item = e.target.closest('.history-item')
    if (item) {
      const city = item.dataset.city
      const lat = parseFloat(item.dataset.lat)
      const lon = parseFloat(item.dataset.lon)
      onHistoryClick({ city, lat, lon })
    }
  })

  elements.clearHistoryBtn.addEventListener('click', () => {
    onClearHistory()
  })
}

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
