//all the html elements we need
const userLocationDiv = document.getElementById("userLocation");
const weatherDiv = document.getElementById("weather");
const temperatureDiv = document.getElementById("temperatureDiv");
const defaultUnit = document.getElementById("defaultUnit");
const optionalUnit = document.getElementById("optionalUnit");

//all the global variables we need
let lat = null;
let lon = null;
let temperature;
let celsius;
let fahrenhite;
let weather;
let locationName;
let weatherIcon;
let weatherColors = {
  warm: '#ffedbf',
  hot: '#ffcd74',
  chill: '#eae9e4',
  cold: ' #23568f'
}

//function definitions
//gets location of user and calls update weather
function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    if (lat !== null && lon !== null) {
      updateWeather(lat, lon);
    }
  });
}

//updates weather from the fcc-weather api using fetch and applies changes to html accordingly
function updateWeather(lat, lon) {
  let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  fetch(url)
    .then(response => {
      response.json()
        .then(data => {
          temperature = data.main.temp;
          temperature = Math.round(temperature);
          weather = data.weather[0].main;
          weatherIcon = data.weather[0].icon;
          locationName = `${data.name}, ${data.sys.country}`;

          userLocationDiv.innerHTML = locationName;
          temperatureDiv.innerHTML = `${temperature}<sup>o</sup>`
          weatherDiv.innerHTML = ` <img src=${weatherIcon}/> ${weather}`;
          defaultUnit.innerHTML = `C`;
          optionalUnit.innerHTML = `F`;
        })
    })
}

//converts temperature to celsius
function convertToCelsius(temperatureString) {
  celsius = Number(temperatureString);
  temperatureDiv.innerHTML = `${celsius}<sup>o</sup>`;
}

//converts temperature to fahrenhite
function convertToFahrenhite(temperatureString) {
  fahrenhite = Number(temperatureString) * 9 / 5 + 32;
  temperatureDiv.innerHTML = `${fahrenhite}<sup>o</sup>`;
}

//function calls and running code

//getLocation() on page load
window.onload = getLocation();

// listen for click on the Celsius div and call convertToCelsius()
defaultUnit.addEventListener('click', () => {
  convertToCelsius(temperature);
  defaultUnit.className = "selectedState";
  optionalUnit.className = "";
})

// listen for click on the Fahrenhite div and call convertToFahrenhite()
optionalUnit.addEventListener('click', () => {
  convertToFahrenhite(temperature);
  optionalUnit.className = "selectedState";
  defaultUnit.className = "";
})

// change color based on the temperature
if (temperature > 20 < 35) {
  document.body.style = `background-color:${weatherColors.warm}`;
} else if (temperature < 35) {
  document.body.style = `background-color:${weatherColors.hot}`;
} else if (temperature < 20 > 10) {
  document.body.style = `background-color:${weatherColors.chill}`;
} else if (temperature < 10) {
  document.body.style = `background-color:${weatherColors.cold}`;
}
