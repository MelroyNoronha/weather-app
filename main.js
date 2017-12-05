const userLocationDiv = document.getElementById("userLocation");
const weatherDiv = document.getElementById("weather");
const temperatureDiv = document.getElementById("temperatureDiv");
const celsiusDiv = document.getElementById("celsiusDiv");
const fahrenhiteDiv = document.getElementById("fahrenhiteDiv");

let lat = null;
let lon = null;
let temperature;
let weather;
let locationName;
let weatherIcon;

function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    lat = position.coords.latitude;
    lon = position.coords.longitude;

    if (lat !== null && lon !== null) {
      getWeather();
    }
  });
}


function getWeather() {
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
}

function changeToFahrenhite(celsius) {
  celsius * 9 / 5 + 32;
}

function changeToCelsius(fahrenhite) {
  return (fahrenhite - 32) * 5 / 9;
}

window.onload = getLocation();

celsiusDiv.addEventListener('click', () => {
  changeToCelsius(temperature)
})

fahrenhiteDiv.addEventListener('click', () => {
  changeToFahrenhite(temperature)
})
