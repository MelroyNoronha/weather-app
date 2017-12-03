const userLocationDiv = document.getElementById("userLocation");
const weatherDiv = document.getElementById("weather");
const weatherBtn = document.getElementById("weatherBtn");
const celsiusDiv = document.getElementById("celsius");
const fahrenhiteDiv = document.getElementById("fahrenhite");

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
          console.log(data);
          let temperature = data.main.temp;
          let weather = data.weather[0].main;
          let locationName = `${data.name}, ${data.sys.country}`;
          weatherDiv.innerHTML = `${temperature} ${weather}`;
          userLocationDiv.innerHTML = locationName;
        })
    })
}

function changeToFahrenhite(celsius) {
  return celsius * 9 / 5 + 32;
}

function changeToCelsius(fahrenhite) {
  return (fahrenhite - 32) * 5 / 9;
}

window.onload = getWeather();
weatherBtn.addEventListener('click', getWeather);
