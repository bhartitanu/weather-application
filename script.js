//window.alert("hello");
document.addEventListener('DOMContentLoaded', () => {
    const API_KEY = '637bcaaac1d982d419dd87713c475084'; // Replace with your OpenWeatherMap API key
    const searchButton = document.querySelector('button[type="submit"]');
    const cityInput = document.querySelector('input[type="text"]');
    const cityContainer = document.querySelector('.city-container h2');
    const dateContainer = document.querySelector('.city-container h3');
    const weatherIcon = document.querySelector('.weather-discription i');
    const weatherDescription = document.querySelector('.discription-text');
    const temperatureContainer = document.querySelector('.temprature');
    const windInfo = document.querySelector('.wind-info .small-text');
    const humidityInfo = document.querySelector('.humidity-info .humidity');
    const visibilityInfo = document.querySelector('.Visibility-info .Visibility-distance');
  
    function updateWeatherUI(data) {
      cityContainer.textContent = data.name;
      dateContainer.textContent = new Date().toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
      weatherIcon.className = `fa-solid ${getWeatherIcon(data.weather[0].main)}`;
      weatherDescription.textContent = data.weather[0].description;
      temperatureContainer.textContent = `${Math.round(data.main.temp)}°`;
      windInfo.textContent = `${data.wind.speed} Km/H`;
      humidityInfo.textContent = `${data.main.humidity}%`;
      visibilityInfo.textContent = `${data.visibility / 1000} Km`;
    }
  
    function getWeatherIcon(description) {
      switch (description.toLowerCase()) {
        case 'clear':
          return 'fa-sun';
        case 'clouds':
          return 'fa-cloud';
        case 'rain':
          return 'fa-cloud-showers-heavy';
        case 'snow':
          return 'fa-snowflake';
        case 'thunderstorm':
          return 'fa-bolt';
        case 'drizzle':
          return 'fa-cloud-rain';
        case 'mist':
        case 'smoke':
        case 'haze':
        case 'dust':
        case 'fog':
        case 'sand':
        case 'ash':
        case 'squall':
        case 'tornado':
          return 'fa-smog';
        default:
          return 'fa-cloud';
      }
    }
  
    async function fetchWeather(city) {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        if (!response.ok) {
          throw new Error('City not found');
        }
        const data = await response.json();
        updateWeatherUI(data);
      } catch (error) {
        alert(error.message);
      }
    }
  
    searchButton.addEventListener('click', () => {
      const city = cityInput.value.trim();
      if (city) {
        fetchWeather(city);
      }
    });
  });
  