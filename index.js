import { apiKey } from "./config.js";

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const weatherIcon = document.querySelector(".weather-icon");

async function cityWeather(city) {
  if (city.trim() === "") {
    // reset fields (I pass empty value when input = cleared)
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = "";
    document.querySelector(".temp").innerHTML = "";
    document.querySelector(".humidity").innerHTML = "";
    document.querySelector(".wind").innerHTML = "";
    document.querySelector(".description").innerHTML = "";
    document.querySelector(".pressure").innerHTML = "";
    document.querySelector(".cloudiness").innerHTML = "";
    document.querySelector(".visibility").innerHTML = "";
    document.querySelector(".sunrise").innerHTML = "";
    document.querySelector(".sunset").innerHTML = "";
    document.querySelector(".feelsLike").innerHTML = "";
    return;
  }

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML =
      "Humidity: " + data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      "Wind Speed: " + data.wind.speed + "km/h";

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";

    document.querySelector(".description").innerHTML =
      data.weather[0].description;
    document.querySelector(".pressure").innerHTML =
      "Pressure: " + data.main.pressure + " hPa";
    document.querySelector(".cloudiness").innerHTML =
      "Cloudiness: " + data.clouds.all + "%";
    document.querySelector(".visibility").innerHTML =
      "Visibility: " + data.visibility + " meters";
    document.querySelector(".sunrise").innerHTML =
      "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.querySelector(".sunset").innerHTML =
      "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.querySelector(".feelsLike").innerHTML =
      "Feels like: " + Math.round(data.main.feels_like) + "°C";

    console.log(data);
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    setTimeout(
      () => console.log("Current Weather Icon SRC:", weatherIcon.src),
      2000
    );
    // Show weather + hide error if data=valid
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBox.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    cityWeather(searchBox.value);
  }
});

// input clear = reset
searchBox.addEventListener("input", () => {
  if (searchBox.value.trim() === "") {
    cityWeather(""); // pass empty value to the function to reset info
  }
});
