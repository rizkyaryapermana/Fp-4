const searchButton = document.querySelector("#btn-submit");
const inputKeyword = document.querySelector("#search-country");
const icon = document.querySelector("#icon-cloud");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  console.log(lat, long);
  fetch(" https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=e0229ac11c4472d40a1cde05559c9a89&units=metric")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("kota").innerHTML = response.name + ", " + response.sys.country;
      document.getElementById("condition").innerHTML = response.weather[0].description;
      document.getElementById("temperatur").innerHTML = response.main.temp + "°С";
      document.getElementById("winds").innerHTML = response.wind.speed + "km/h";
      icon.src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    });

  // Initialize the map and assign it to a variable for later use
  // there's a few ways to declare a VARIABLE in javascript.
  // you might also see people declaring variables using `const` and `let`
  var map = L.map("map", {
    // Set latitude and longitude of the map center (required)
    center: [lat, long],
    // Set the initial zoom level, values 0-18, where 0 is most zoomed-out (required)
    zoom: 11,
  });

  // Create a Tile Layer and add it to the map
  var tiles = new L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: "8",
  }).addTo(map);

  var marker = L.marker([lat, long], {
    draggable: true,
    title: "",
    opacity: 0.75,
  });

  marker.addTo(map);

  marker.on("dragend", function (e) {
    lat = e.target._latlng.lat;
    long = e.target._latlng.lng;
    fetch(" https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=e0229ac11c4472d40a1cde05559c9a89&units=metric")
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        document.getElementById("kota").innerHTML = response.name + ", " + response.sys.country;
        document.getElementById("condition").innerHTML = response.weather[0].description;
        document.getElementById("temperatur").innerHTML = response.main.temp + "°С";
        document.getElementById("winds").innerHTML = response.wind.speed + "km/h";
        icon.src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
      });
  });
}

searchButton.addEventListener("click", function () {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + inputKeyword.value + "&appid=e0229ac11c4472d40a1cde05559c9a89&units=metric")
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      document.getElementById("kota").innerHTML = response.name + ", " + response.sys.country;
      document.getElementById("condition").innerHTML = response.weather[0].description;
      document.getElementById("temperatur").innerHTML = response.main.temp + "°С";
      document.getElementById("winds").innerHTML = response.wind.speed + "km/h";
      icon.src = "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
    });
  inputKeyword.value = null;
});
