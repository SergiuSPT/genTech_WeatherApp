import { CONFIG } from './config.js'
import { logger } from './logger.js'

// 🔑 Cheia API (setează în config.js în practică)
const API_KEY = 'ad4a5cbd9afa1db4729d2bd0b56ccf62'
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

/**
 * Fetch current weather by city name
 * @param {string} city - Numele orașului
 * @param {string} unit - Unitatea temperaturii (metric / imperial)
 * @param {string} lang - Limba descrierii meteo
 */
export const getCurrentWeather = async (city, unit = 'metric', lang = 'en') => {
  const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=${unit}&lang=${lang}`
  logger.info('Fetching weather by city', { url })
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    logger.debug('Weather data received', data)
    return data
  } catch (error) {
    logger.error('Error fetching weather by city', error)
    throw error
  }
}

/**
 * Fetch current weather by coordinates
 * @param {number} lat - Latitudine
 * @param {number} lon - Longitudine
 * @param {string} unit - Unitatea temperaturii
 * @param {string} lang - Limba
 */
export const getWeatherByCoords = async (lat, lon, unit = 'metric', lang = 'en') => {
  const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}&lang=${lang}`
  logger.info('Fetching weather by coordinates', { url })
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }
    const data = await response.json()
    logger.debug('Weather data received', data)
    return data
  } catch (error) {
    logger.error('Error fetching weather by coordinates', error)
    throw error
  }
}

/**
 * Fallback pentru a încerca ambele metode (city + coords) dacă e necesar
 * @param {Object} options - Opțiuni: city sau coords
 * @param {string} unit - Unitatea temperaturii
 * @param {string} lang - Limba
 */
export const getCurrentWeatherWithFallback = async (options, unit = 'metric', lang = 'en') => {
  try {
    if (options.city) {
      return await getCurrentWeather(options.city, unit, lang)
    } else if (options.coords) {
      const { lat, lon } = options.coords
      return await getWeatherByCoords(lat, lon, unit, lang)
    } else {
      throw new Error('Invalid options: city or coords required')
    }
  } catch (error) {
    logger.error('Weather fallback failed', error)
    throw error
  }
}
