var searchBtn = document.getElementById("searchBtn");
var APIkey = "8a7f98a4a4a793399f951c1d433d5a22";
// var city = "london";
var dailyTemp = document.getElementById("dailyTemp");
let cityEl = document.getElementById("cityName");
let dateEl = document.getElementById("dateEl");
let currentTempEl = document.getElementById("currentTemp");
let currentWindEl = document.getElementById("currentWind");
let currentHumEl = document.getElementById("currentHum");
let fiveDayForcast = document.getElementById("test");

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
      for (var i = 0; i < data.list.length; i += 8) {
        if (i < data.list.length) {
          // pulling the relevant data
          var nextTemp = data.list[i].main.temp;
          var nextDate = data.list[i].dt_txt;

          // creating relevant elements
          var nextForcastSpanEl = document.createElement("span");
          // var nextDayDivEl = document.createElement("div");
          var nextTempH = document.createElement("h5");
          var nextDateH = document.createElement("h5");

          // Putting Data inside the elements
          nextTempH.textContent = `${nextTemp} c°`;
          nextDateH.textContent = nextDate;

          //appending
          fiveDayForcast.appendChild(nextForcastSpanEl);
          // nextForcastSpanEl.appendChild(nextDayDivEl);
          nextForcastSpanEl.appendChild(nextDateH);
          nextForcastSpanEl.appendChild(nextTempH);

          console.log(nextTemp);
        }
      }
    });
}
