
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const searchButton = form.querySelector("button");

// Translate weather codes into descriptions and icons.
function describeWeather(code) {
  if (code === 0) return { text: "Clear sky", icon: "☀️" };
  if (code === 1) return { text: "Mainly clear", icon: "🌤️" };
  if (code === 2) return { text: "Partly cloudy", icon: "⛅" };
  if (code === 3) return { text: "Overcast", icon: "☁️" };

  if (code === 45 || code === 48) {
    return { text: "Foggy", icon: "🌫️" };
  }

  if (code >= 51 && code <= 57) {
    return { text: "Drizzle", icon: "🌦️" };
  }

  if (code >= 61 && code <= 67) {
    return { text: "Rain", icon: "🌧️" };
  }

  if (code >= 71 && code <= 77) {
    return { text: "Snowfall", icon: "❄️" };
  }

  if (code >= 80 && code <= 82) {
    return { text: "Rain showers", icon: "🌦️" };
  }

  if (code === 85 || code === 86) {
    return { text: "Snow showers", icon: "🌨️" };
  }

  if (code >= 95 && code <= 99) {
    return { text: "Thunderstorm", icon: "⛈️" };
  }

  return { text: "Unknown conditions", icon: "🌡️" };
}

// Convert a city name into coordinates.
async function findCity(city) {
  const params = new URLSearchParams({
    name: city,
    count: 1,
    language: "en",
    format: "json"
  });

  const response = await fetch(
    "https://geocoding-api.open-meteo.com/v1/search?" +
    params.toString()
  );

  if (!response.ok) {
    throw new Error(
      "City search failed (HTTP " + response.status + ")."
    );
  }

  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    throw new Error("City not found. Check the spelling.");
  }

  return data.results[0];
}

// Fetch weather using the coordinates.
async function getWeather(latitude, longitude) {
  const params = new URLSearchParams({
    latitude: latitude,
    longitude: longitude,
    current:
      "temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code"
  });

  const response = await fetch(
    "https://api.open-meteo.com/v1/forecast?" +
    params.toString()
  );

  if (!response.ok) {
    throw new Error(
      "Weather request failed (HTTP " + response.status + ")."
    );
  }

  const data = await response.json();

  if (!data.current || data.current.weather_code === undefined) {
    throw new Error("The API returned incomplete weather data.");
  }

  return data;
}

// Update the page with the returned weather data.
function displayWeather(location, weather) {
  const current = weather.current;
  const units = weather.current_units;
  const description = describeWeather(current.weather_code);

  cityName.textContent =
    location.name +
    (location.country ? ", " + location.country : "");

  temperature.textContent =
    Math.round(current.temperature_2m) +
    " " + units.temperature_2m;

  condition.textContent =
    description.icon + " " + description.text;

  humidity.textContent =
    "Humidity: " + current.relative_humidity_2m +
    " " + units.relative_humidity_2m;

  wind.textContent =
    "Wind speed: " + current.wind_speed_10m +
    " " + units.wind_speed_10m;
}

// Handle the user's search.
form.addEventListener("submit", async function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (!city) {
    message.textContent = "Please enter a city name.";
    return;
  }

  searchButton.disabled = true;
  message.textContent = "Searching for " + city + "...";

  try {
    const location = await findCity(city);

    message.textContent = "Fetching weather...";

    const weather = await getWeather(
      location.latitude,
      location.longitude
    );

    displayWeather(location, weather);
    message.textContent = "Weather updated successfully.";
  } catch (error) {
    message.textContent =
      error instanceof TypeError
        ? "Network error. Check your internet connection and try again."
        : error.message;

    console.error("Weather app error:", error);
  } finally {
    searchButton.disabled = false;
  }
});
