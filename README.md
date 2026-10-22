
# 🌦️ Weather App

A simple, responsive weather application that lets users search for a city and view its current weather conditions. Built as a learning project to understand API integration, asynchronous JavaScript, and dynamic web interfaces.

## ✨ Features

- 🔍 **City Search** — Search for a city by name.
- 🌡️ **Current Temperature** — View the current temperature in Celsius.
- 🌤️ **Weather Conditions** — Get a description and emoji representing the weather.
- 💧 **Humidity** — Check the current relative humidity.
- 💨 **Wind Speed** — View the current wind speed.
- ⚠️ **Error Handling** — Helpful messages for invalid cities or failed requests.
- ⏳ **Loading State** — Feedback while fetching weather data.
- 📱 **Responsive Design** — Works across desktop and mobile screens.

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Open-Meteo API

## 🌐 APIs Used

1. **Geocoding API** — Converts city names into geographic coordinates.
2. **Weather Forecast API** — Retrieves current weather data using latitude and longitude.

No API key is required for standard non-commercial use.

## 📂 Project Structure

```text
weather-app/
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/tKohinoor/weather-app.git
```

### 2. Navigate to the project folder

```bash
cd weather-app
```

### 3. Run the application

Open `index.html` in your browser, or use the Live Server extension in Visual Studio Code.

## ⚙️ How It Works

1. Enter a city name.
2. The Geocoding API retrieves the city's coordinates.
3. The Weather Forecast API fetches current weather data.
4. The app displays the results dynamically.

## 📚 What I Learned

- Working with REST APIs and JSON.
- Using JavaScript's `fetch()` API.
- Understanding Promises and `async/await`.
- Handling errors with `try/catch/finally`.
- Using `URLSearchParams` for query parameters.
- Updating the DOM dynamically.
- Implementing loading states and responsive UI.

## 🔮 Future Improvements

- Add a multi-day weather forecast.
- Implement temperature conversion between Celsius and Fahrenheit.
- Add recent search history.
- Improve weather visuals with dynamic icons and backgrounds.

## 📄 License

This project is open source and available for learning and personal use.

---

**Built with ☕ and JavaScript.**
