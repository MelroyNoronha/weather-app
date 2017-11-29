
let userLat = "";

let userLon = "";

let url = `https://fcc-weather-api.glitch.me/api/current?lat=${userLat}&lon=${userLon}`;

window.onload = getLocation();

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
