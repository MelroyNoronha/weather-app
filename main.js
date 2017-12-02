const userLocation = document.getElementById("userLocation");
const weather = document.getElementById("weather");
const weatherBtn = document.getElementById("weatherBtn");
const celsius = document.getElementById("celsius");
const fahrenhite = document.getElementById("fahrenhite");

let lat;
let lon;

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
          let weatherData = data.main;
          let locationName = data.name;
          weather.innerHTML = JSON.stringify(weatherData.temp);
          userLocation.innerHTML = locationName;
        })
    })
}

window.onload = getWeather();
weatherBtn.addEventListener('click', getWeather);
