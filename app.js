// Importuri existente și noi:
import { logger } from './modules/logger.js'
import { historyService } from './modules/history-service.js'
import { weatherService } from './modules/weather-service.js'
import * as ui from './modules/ui-controller.js'
import {
  renderHistory,
  showHistory,
  addHistoryEventListeners,
} from './modules/ui-controller.js'

// Inițializare aplicație
const initializeApp = async () => {
  logger.info('Weather App starting...')

  setupEventListeners()
  loadHistoryOnStart()

  logger.info('Weather App initialized successfully')
}

// Încarcă istoricul la start
const loadHistoryOnStart = () => {
  const history = historyService.getHistory()
  if (history.length > 0) {
    renderHistory(history)
    showHistory()
    logger.info(`Loaded ${history.length} items from history`)
  }
}

// Funcție principală de căutare
const handleSearch = async () => {
  const city = ui.getCityInput().trim()

  logger.debug('Search initiated', { city })

  if (!isValidCity(city)) {
    const errorMsg = 'Numele orașului nu este valid'
    ui.showError(errorMsg)
    logger.warn('Invalid city input', { city })
    return
  }

  try {
    ui.showLoading()
    logger.info('Fetching weather data', { city })

    const weatherData = await weatherService.getCurrentWeather(city)

    historyService.addLocation(weatherData) // Salvare în istoric

    ui.displayWeather(weatherData)
    ui.clearInput()

    const updatedHistory = historyService.getHistory()
    renderHistory(updatedHistory)
    showHistory()

    logger.info('Weather data displayed successfully', {
      city: weatherData.name,
      temp: weatherData.main.temp,
    })
  } catch (error) {
    ui.showError('Nu am putut obține vremea. Încearcă din nou.')
    logger.error('Failed to fetch weather data', error)
  } finally {
    ui.hideLoading()
  }
}

// Funcție pentru click pe istoric
const handleHistoryClick = async ({ city, lat, lon }) => {
  logger.info('History item clicked', { city, lat, lon })

  try {
    ui.showLoading()

    const weatherData = await weatherService.getWeatherByCoords(lat, lon)

    historyService.addLocation(weatherData)

    ui.displayWeather(weatherData)

    const updatedHistory = historyService.getHistory()
    renderHistory(updatedHistory)

    logger.info('Weather loaded from history', { city })
  } catch (error) {
    ui.showError('Nu am putut obține vremea din istoric.')
    logger.error('Failed to load weather from history', error)
  } finally {
    ui.hideLoading()
  }
}

// Funcție pentru ștergere istoric
const handleClearHistory = () => {
  if (confirm('Sigur vrei să ștergi tot istoricul de căutări?')) {
    historyService.clearHistory()
    renderHistory([])
    logger.info('Search history cleared')
  }
}

// Setup Event Listeners
const setupEventListeners = () => {
  ui.elements.searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    handleSearch()
  })

  addHistoryEventListeners(handleHistoryClick, handleClearHistory)
}

// Validator simplu pentru oraș (poți îmbunătăți)
const isValidCity = (city) => city.length >= 2

// Pornește aplicația
initializeApp()
