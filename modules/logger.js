import { CONFIG } from './config.js'

export class Logger {
  constructor() {
    this.logs = []
    this.levels = { debug: 0, info: 1, warn: 2, error: 3 }
    this.currentLevel = this.levels[CONFIG.LOGGING.LEVEL] ?? 1
  }

  debug(message, data = null) {
    if (this.currentLevel <= this.levels.debug) {
      this._log('debug', message, data)
    }
  }

  info(message, data = null) {
    if (this.currentLevel <= this.levels.info) {
      this._log('info', message, data)
    }
  }

  warn(message, data = null) {
    if (this.currentLevel <= this.levels.warn) {
      this._log('warn', message, data)
    }
  }

  error(message, error = null) {
    if (this.currentLevel <= this.levels.error) {
      const errorInfo = error instanceof Error ? { message: error.message, stack: error.stack } : error
      this._log('error', message, errorInfo)
    }
  }

  _log(level, message, data) {
    const timestamp = new Date().toLocaleTimeString()
    const logEntry = { timestamp, level, message, data }
    this.logs.push(logEntry)

    // Limitează numărul de log-uri
    if (this.logs.length > CONFIG.LOGGING.MAX_LOGS) {
      this.logs.shift() // elimină cel mai vechi log
    }

    // Consolă standard (pentru development)
    const logMessage = `[${timestamp}] [${level.toUpperCase()}] ${message}`
    if (level === 'error') {
      console.error(logMessage, data)
    } else if (level === 'warn') {
      console.warn(logMessage, data)
    } else {
      console.log(logMessage, data)
    }
  }

  getLogs() {
    return [...this.logs] // Copie sigură
  }

  clearLogs() {
    this.logs = []
  }

  show() {
    console.table(this.logs)
  }
}

// Instanță globală (Singleton)
export const logger = new Logger()

// Debug global (accesibil în browser)
window.logs = {
  show: () => logger.show(),
  clear: () => logger.clearLogs(),
  get: () => logger.getLogs(),
}
