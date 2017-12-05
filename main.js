const userLocationDiv = document.getElementById("userLocation");
const weatherDiv = document.getElementById("weather");
const temperatureDiv = document.getElementById("temperatureDiv");
const defaultUnit = document.getElementById("defaultUnit");
const optionalUnit = document.getElementById("optionalUnit");

let lat = null;
let lon = null;
let temperature;
let celsius;
let fahrenhite;
let weather;
let locationName;
let weatherIcon;

function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    if (lat !== null && lon !== null) {
      updateWeather();
    }
  });
}


function updateWeather() {
  let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  fetch(url)
    .then(response => {
      response.json()
        .then(data => {

          temperature = data.main.temp;
          weather = data.weather[0].main;
          weatherIcon = data.weather[0].icon;
          locationName = `${data.name}, ${data.sys.country}`;

          userLocationDiv.innerHTML = locationName;
          temperatureDiv.innerHTML = `${temperature}<sup>o</sup>`
          weatherDiv.innerHTML = ` <img src=${weatherIcon}/> ${weather}`;
        })
    })
}

function changeToCelsius(string) {
  celsius = string;
  temperatureDiv.innerHTML = `${celsius}<sup>o</sup>`;
}

function changeToFahrenhite(string) {
  fahrenhite = Number(string) * 9 / 5 + 32;
  temperatureDiv.innerHTML = `${fahrenhite}<sup>o</sup>`;
}

window.onload = getLocation();

//temp
defaultUnit.addEventListener('click', () => {
  changeToCelsius(temperature);
  defaultUnit.className = "selectedState";
  optionalUnit.className = "";
})

optionalUnit.addEventListener('click', () => {
  changeToFahrenhite(temperature);
  optionalUnit.className = "selectedState";
  defaultUnit.className = "";
})