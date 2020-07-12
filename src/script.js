function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let minimumTemperatureElement = document.querySelector("#temp-min");
  let maximumTemperatureElement = document.querySelector("#temp-max");
  let iconElement = document.querySelector("#icon");

  fahrenheitTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  minimumTemperatureElement.innerHTML = Math.round(response.data.main.temp_min);
  maximumTemperatureElement.innerHTML = Math.round(response.data.main.temp_max);
  iconElement.innerHTML = response.data.weather[0].icon;
  if (response.data.weather[0].icon === "01d") {
    iconElement.innerHTML = `<i class="fas fa-sun"></i>`;
  } else if (response.data.weather[0].icon === "02d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "03d") {
    iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
  } else if (response.data.weather[0].icon === "04d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
  } else if (response.data.weather[0].icon === "09d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-sun-rain"></i>`;
  } else if (response.data.weather[0].icon === "10d") {
    iconElement.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
  } else if (response.data.weather[0].icon === "11d" || "10n") {
    iconElement.innerHTML = `<i class="fas fa-poo-storm"></i>`;
  } else if (response.data.weather[0].icon === "13d" || "13n") {
    iconElement.innerHTML = `<i class="fas fa-snowflake"></i>`;
  } else if (response.data.weather[0].icon === "50d" || "50n") {
    iconElement.innerHTML = `<i class="fas fa-smog"></i>`;
  } else if (response.data.weather[0].icon === "01n") {
    iconElement.innerHTML = `<i class="fas fa-moon"></i>`;
  } else if (response.data.weather[0].icon === "02n") {
    iconElement.innerHTML = '<i class="fas fa-cloud-moon"></i>';
  } else if (response.data.weather[0].icon === "03n") {
    iconElement.innerHTML = `<i class="fas fa-cloud"></i>`;
  } else if (response.data.weather[0].icon === "04n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon"></i>`;
  } else if (response.data.weather[0].icon === "09n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  } else if (response.data.weather[0].icon === "10n") {
    iconElement.innerHTML = `<i class="fas fa-cloud-moon-rain"></i>`;
  }
}

function searchCity(city) {
  let apiKey = "0f0e97f91ce7e0b3ade2a5e918c941d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "0f0e97f91ce7e0b3ade2a5e918c941d0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let celsiusTemperature = (fahrenheitTemperature - 32) / 1.8;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

searchCity("Boston");
