const userLocationDiv = document.getElementById("userLocation");
const weatherDiv = document.getElementById("weather");
const weatherBtn = document.getElementById("weatherBtn");
const temperatureDiv = document.getElementById("temperatureDiv");
const celsiusDiv = document.getElementById("celsiusDiv");
const fahrenhiteDiv = document.getElementById("fahrenhiteDiv");

let lat;
let lon;
let temperature;
let weather;
let locationName;
let weatherIcon;

function getWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
  });

  let url = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;
  fetch(url)
    .then(response => {
      response.json()
        .then(data => {
          console.log(data);
          temperature = data.main.temp;
          weather = data.weather[0].main;
          weatherIcon = data.weather[0].icon;
          locationName = `${data.name}, ${data.sys.country}`;
          weatherDiv.innerHTML = `${weather} <img src=${weatherIcon}/>`;
          userLocationDiv.innerHTML = locationName;
          temperatureDiv.innerHTML = `${temperature}`
        })
    })

  celsiusDiv.addEventListener('click', () => {
    changeToCelsius(temperature)
  })
}

function changeToFahrenhite(celsius) {
  celsius * 9 / 5 + 32;
  temperature = celsius;
  console.log(temperature);
}

function changeToCelsius(fahrenhite) {
  return (fahrenhite - 32) * 5 / 9;
}

window.onload = getWeather();
weatherBtn.addEventListener('click', getWeather);
