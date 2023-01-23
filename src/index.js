// Date
function formatDate(timestamp) {
  let now = new Date(timestamp);

  let date = now.getDate();
  let hours = now.getHours();

  if (hours < 10) {
    hours = "0".concat(hours);
  }

  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = "0".concat(minutes);
  }

  let year = now.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];

  let months = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];

  return `Today is ${day} ${date} ${month} ${year}, ${hours}:${minutes}`;
}

// Temperature to Fahrenheit
function changeTempToFahrenheit(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = 21;
}

document
  .querySelector("#fahrenheit-link")
  .addEventListener("click", changeTempToFahrenheit);

// Temperature to Celsius
function changeTempToCelsius(event) {
  event.preventDefault();
  let mainTemp = document.querySelector("#main-temp");
  mainTemp.innerHTML = -6;
}

document
  .querySelector("#celsius-link")
  .addEventListener("click", changeTempToCelsius);

// Show Weather

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#main-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#main-weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feels-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed * 3.6
  );
  document.querySelector("#high-temp-degrees").innerHTML = Math.round(
    response.data.main.temp_max
  );
  document.querySelector("#low-temp-degrees").innerHTML = Math.round(
    response.data.main.temp_min
  );
  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.dt * 1000
  );
}

function searchCity(city) {
  let key = "49cb8e792c40ac1acbc32945671fdf8e";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value.trim();
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let searchBotton = document.querySelector("#search-botton");
searchBotton.addEventListener("click", handleSubmit);

function searchLocation(position) {
  let key = "49cb8e792c40ac1acbc32945671fdf8e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let locationBotton = document.querySelector("#location-botton");
locationBotton.addEventListener("click", getCurrentLocation);

searchCity("Kyiv");
