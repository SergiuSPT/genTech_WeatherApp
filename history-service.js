import { CONFIG } from './config.js'
import { logger } from './logger.js'

export class HistoryService {
  constructor() {
    this.storageKey = CONFIG.STORAGE_KEYS.SEARCH_HISTORY
    this.maxItems = CONFIG.MAX_HISTORY_ITEMS
  }

  /**
   * Adaugă o locație în istoric (fără duplicate, move to top)
   * @param {Object} weatherData - Datele meteo (OpenWeatherMap response)
   */
  addLocation(weatherData) {
    const city = weatherData.name
    const country = weatherData.sys?.country || ''
    const coordinates = weatherData.coord || {}

    const newEntry = {
      city,
      country,
      coordinates,
      timestamp: Date.now(),
    }

    let history = this._loadFromStorage()

    // Caută duplicate (după city + country)
    const existingIndex = history.findIndex(
      (item) =>
        item.city.toLowerCase() === city.toLowerCase() &&
        item.country.toLowerCase() === country.toLowerCase()
    )

    if (existingIndex !== -1) {
      // Mută la început (move to top)
      const [existing] = history.splice(existingIndex, 1)
      history.unshift(existing)
      logger.info('Location moved to top of history', { city, country })
    } else {
      // Adaugă nou
      history.unshift(newEntry)
      logger.info('Location added to history', newEntry)
    }

    // Limitează la maximul configurat
    if (history.length > this.maxItems) {
      history = history.slice(0, this.maxItems)
      logger.debug('History trimmed to max items', { max: this.maxItems })
    }

    this._saveToStorage(history)
  }

  /**
   * Obține istoricul complet
   */
  getHistory() {
    return this._loadFromStorage()
  }

  /**
   * Șterge o locație specifică din istoric
   * @param {string} city - Orașul de șters
   */
  removeLocation(city) {
    let history = this._loadFromStorage()
    const updated = history.filter(
      (item) => item.city.toLowerCase() !== city.toLowerCase()
    )
    this._saveToStorage(updated)
    logger.info('Location removed from history', { city })
  }

  /**
   * Șterge tot istoricul
   */
  clearHistory() {
    this._saveToStorage([])
    logger.warn('History cleared')
  }

  /**
   * Salvează array-ul în localStorage
   * @param {Array} history
   */
  _saveToStorage(history) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(history))
    } catch (error) {
      logger.error('Failed to save history to localStorage', error)
    }
  }

  /**
   * Încarcă istoricul din localStorage
   * @returns {Array}
   */
  _loadFromStorage() {
    try {
      const data = localStorage.getItem(this.storageKey)
      return data ? JSON.parse(data) : []
    } catch (error) {
      logger.error('Failed to load history from localStorage', error)
      return []
    }
  }
}

export const historyService = new HistoryService()
