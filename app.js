
// URL that points to the API
let url = "https://weather-proxy.freecodecamp.rocks/api/current";

// Overlay
const overlay = document.querySelector("#overlay");

// Get date and time
var d = new Date();
var time = Math.floor(d.getTime() / 1000); // removes milliseconds

// Attempts to get the current location
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(position);
} else {
  alert("Unable to access your location");
}

/* Gets the position */
function position(pos) {
  const LAT = pos.coords.latitude;
  const LON = pos.coords.longitude;

  // Adds the currrent location to the URL of the API
  url += "?lat=" + LAT + "&lon=" + LON;

  // Calls the URL and gets the results as JSON
  fetch(url)
    .then((res) => res.json())
    .then(weather);
}

/* Gets the local weather */
function weather(data) {
  // Location
  const CITY = data.name;
  const CTRY = data.sys.country;
  const LOC = CITY + ", " + CTRY;

  // Sunset and Sunrise
  const RISE = data.sys.sunrise;
  const SET = data.sys.sunset;

  // Temperature info
  const TEMP = Math.round(data.main.temp);
  const FEEL = Math.round(data.main.feels_like) + " °C";
  const LOW = Math.round(data.main.temp_min) + " °C";
  const HIGH = Math.round(data.main.temp_max) + " °C";

  // Weather
  const MAIN = data.weather[0].main;
  const ICON = data.weather[0].icon;
  const DESC = data.weather[0].description;
  const WIND = Math.round(data.wind.speed) + " mph";
  const HUMIDITY = data.main.humidity + "%";

  // Sets the background
  if (time >= RISE && time < SET) {
    document.body.style.backgroundColor = "#00b4ff";
    overlay.style.backgroundColor = "rgba(0, 129, 230, 0.4)";
  } else if (time >= SET) {
    document.body.style.backgroundColor = "#2a2a35";
    overlay.style.backgroundColor = "rgba(51, 51, 51, 0.7)";
  }

  // Display temperature
  document.querySelector("#loc").innerHTML = LOC;
  document.querySelector("#temp").innerHTML = TEMP;
  document.querySelector("#low").innerHTML = LOW;
  document.querySelector("#feel").innerHTML = FEEL;
  document.querySelector("#high").innerHTML = HIGH;

  // Display weather
  document.querySelector("img#icon").src = ICON;
  document.querySelector("img#icon").alt = MAIN;
  document.querySelector("#main").innerHTML = MAIN;
  document.querySelector("#humidity").innerHTML = HUMIDITY;
  document.querySelector("#desc").innerHTML = DESC;
  document.querySelector("#wind").innerHTML = WIND;
}

/* Converts celsius to fahrenheit and vice-versa */
function convert(deg) {
  let temp = document.querySelector("#temp").innerHTML;
  let high = document.querySelector("#high").innerHTML.match(/\d+/)[0];
  let feel = document.querySelector("#feel").innerHTML.match(/\d+/)[0];
  let low = document.querySelector("#low").innerHTML.match(/\d+/)[0];
  const f = document.querySelector("#f");
  const c = document.querySelector("#c");

  // Determines what to convert the temperatures to
  if (deg == "C") {
    if (!c.classList.contains("cur")) {
      temp = celsius(temp);
      high = celsius(high);
      feel = celsius(feel);
      low = celsius(low);

      f.classList.remove("cur");
      c.classList.add("cur");
    }
  } else if (deg == "F") {
    if (!f.classList.contains("cur")) {
      temp = fahrenheit(temp);
      high = fahrenheit(high);
      feel = fahrenheit(feel);
      low = fahrenheit(low);

      c.classList.remove("cur");
      f.classList.add("cur");
    }
  }

  // Updates temperatures
  document.querySelector("#temp").innerHTML = Math.round(temp);
  document.querySelector("#high").innerHTML = Math.round(high) + " °" + deg;
  document.querySelector("#feel").innerHTML = Math.round(feel) + " °" + deg;
  document.querySelector("#low").innerHTML = Math.round(low) + " °" + deg;
}

/* Returns the temperature in fahrenheit */
function fahrenheit(cel) {
  return (cel * 9) / 5 + 32;
}

/* Returns the temperature in celisus */
function celsius(far) {
  return ((far - 32) * 5) / 9;
}

