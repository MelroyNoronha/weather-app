const userLocation = document.getElementById("userLocation");
const temperature = document.getElementById("temperature");
const weatherBtn = document.getElementById("weatherBtn");
const celsius = document.getElementById("celsius");
const fahrenhite = document.getElementById("fahrenhite");

let userLat = "";

let userLon = "";

let url = `https://fcc-weather-api.glitch.me/api/current?lat=${userLat}&lon=${userLon}`;



function getLocation() {
  navigator.geolocation.getCurrentPosition(position => {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
  });
  console.log(typeof (userLat))
}

fetch(url).then(response => {
  console.log(response.json());
});
