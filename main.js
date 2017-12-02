var userLocation = document.getElementById("userLocation");
var temperature = document.getElementById("temperature");
var weatherBtn = document.getElementById("weatherBtn");
var celsius = document.getElementById("celsius");
var fahrenhite = document.getElementById("fahrenhite");

var userLat = "";

var userLon = "";

var url = `https://fcc-weather-api.glitch.me/api/current?lat=${userLat}&lon=${userLon}`;

function getLocation() {
  navigator.geolocation.getCurrentPosition(function (position) {
    userLat = position.coords.latitude;
    userLon = position.coords.longitude;
  });

  console.log(typeof (userLat));//test

  fetch(url).then(function (response) {
    console.log(response.json());
  });
}
