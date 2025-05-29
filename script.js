const apiKey = 'fc9dfeb81664d172f654ce23e87e2aac'; // Replace with your OpenWeatherMap API key

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherIcon = document.getElementById("weatherIcon");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const error = document.getElementById("error");
const themeToggle = document.getElementById("themeToggle");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  themeToggle.textContent = document.body.classList.contains("light-mode") ? "🌙" : "☀️";
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");

    const data = await res.json();

    cityName.textContent = `${data.name}, ${data.sys.country}`;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].main;
    humidity.textContent = data.main.humidity;
    windSpeed.textContent = data.wind.speed;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    // Background based on weather
    document.body.style.background = getBackground(data.weather[0].main);

    error.classList.add("hidden");
    weatherCard.classList.remove("hidden");
  } catch (err) {
    weatherCard.classList.add("hidden");
    error.classList.remove("hidden");
  }
}

function getBackground(weather) {
  switch (weather.toLowerCase()) {
    case "clear": return "linear-gradient(to top right, #56ccf2, #2f80ed)";
    case "clouds": return "linear-gradient(to top right, #bdc3c7, #2c3e50)";
    case "rain": return "linear-gradient(to top right, #4b79a1, #283e51)";
    case "snow": return "linear-gradient(to top right, #e6dada, #274046)";
    case "thunderstorm": return "linear-gradient(to top right, #373b44, #4286f4)";
    default: return "linear-gradient(to top right, #3a3a3a, #1f1f1f)";
  }
}
