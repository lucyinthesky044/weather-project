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

function showWeather(response) {
  celsiusTemp = response.data.main.temp;

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
  document
    .querySelector("#icon-main")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  document
    .querySelector("#icon-main")
    .setAttribute("alt", response.data.weather[0].description);
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

function searchLocation(position) {
  let key = "49cb8e792c40ac1acbc32945671fdf8e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${key}&units=metric`;
  axios.get(url).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  let forecastHTML = `<div class="row align-items-center">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-4" id="weather-forecast-date">
        ${day}
        <div id="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">-1° </span>
          <span class="weather-forecast-temperature-min">1°</span>
        </div>
      </div>
      <div class="col-4">
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="80"
        />
      </div>
      <div class="col-4" id="weather-forecast-description">
        Partly Cloudy
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

showForecast();
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

let searchBotton = document.querySelector("#search-botton");
searchBotton.addEventListener("click", handleSubmit);

let celsiusTemp = null;

let locationBotton = document.querySelector("#location-botton");
locationBotton.addEventListener("click", getCurrentLocation);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Kyiv");
