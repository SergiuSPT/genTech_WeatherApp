# 🌦️ Weather App

Aplicație web simplă care afișează informații despre vreme pentru un oraș introdus de utilizator.

## 🔧 Tehnologii folosite

- HTML5
- CSS3
- JavaScript (ES Modules)
- Mocked API (simulare răspuns OpenWeather)

---

## 📁 Structură proiect
/weather-app
│
├── index.html # Interfață HTML
├── styles.css # Stiluri aplicație
├── app.js # Punct principal al aplicației
│
├── modules/
│ ├── config.js # Setări & date simulate (MOCK)
│ ├── weatherService.js # Serviciu pentru obținerea vremii
│ └── ui.js # Control interfață (DOM)

## 🔧 Funcționalități
Căutare vreme după numele orașului

Afișare temperatură, umiditate, presiune, vânt, răsărit/apus

Loading indicator

Gestionare erori (oraș invalid sau rețea indisponibilă)

UI modular, cod organizat în module clare

