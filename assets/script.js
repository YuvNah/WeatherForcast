var searchBtn = document.getElementById("searchBtn");
var APIkey = "8a7f98a4a4a793399f951c1d433d5a22";
// var city = "london";
var dailyTemp = document.getElementById("dailyTemp");
let cityEl = document.getElementById("cityName");
let dateEl = document.getElementById("dateEl");
let currentTempEl = document.getElementById("currentTemp");
let currentWindEl = document.getElementById("currentWind");
let currentHumEl = document.getElementById("currentHum");

function getApi() {
  var city = document.getElementById("search-form").value;
  var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${APIkey}`;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var lat = data[0].lat;
      var lon = data[0].lon;
      getWeather(lat, lon);
    });
}
searchBtn.addEventListener("click", getApi);

function getWeather(lat, lon) {
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var temp = data.list[0].main.temp;
      var currentDate = data.list[0].dt_txt;
      var currentWind = data.list[0].wind.speed;
      var currentHum = data.list[0].main.humidity;
      cityEl.textContent = document.getElementById("search-form").value;
      dateEl.textContent = currentDate;
      currentTempEl.textContent = `${temp} c°`;
      currentWindEl.textContent = currentWind;
      currentHumEl.textContent = `${currentHum}%`;
      for (var i = 0; i < 6; i += 8) {
        var nextTemp = data.list[i].main.temp;
        console.log(nextTemp);
      }
    });
}
