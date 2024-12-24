
//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherbox = document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  const APIkey = 'your-new-api-key'; // Replace 'your-new-api-key' with your actual new key
  const city = document.querySelector('.search-box input').value;

  if (city.trim() === "") return;

  fetch(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude=minutely,hourly,daily&appid=${APIkey}`)
    .then(response => response.json())
    .then(json => {
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherbox.classList.remove('active');
        weatherdetails.classList.remove('active');
        error404.style.display = 'block';
        return;
      }

      container.style.height = '550px';
      weatherbox.classList.add('active');
      weatherdetails.classList.add('active');
      error404.style.display = 'none';

      const image = document.querySelector('.weather-box img');
      const temperature = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description');
      const humidity = document.querySelector('.weather-details .humidity span');
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.current.weather[0].main) {
        case 'Clear':
          image.src = './weatherpics/clear-01.png';
          break;
        case 'Rain':
          image.src = './weatherpics/rain-01.png';
          break;
        case 'Snow':
          image.src = './weatherpics/snow-01.png';
          break;
        case 'Clouds':
          image.src = './weatherpics/cloudy-01.png';
          break;
        case 'Mist':
        case 'Haze':
          image.src = './weatherpics/haze-01.png';
          break;
        case 'Storm':
          image.src = './weatherpics/storm-01.png';
          break;
        default:
          image.src = './weatherpics/storm-01.png';
      }

      temperature.innerHTML = `${parseInt(json.current.temp)}<span>°C</span>`;
      description.innerHTML = `${json.current.weather[0].description}`;
      humidity.innerHTML = `${json.current.humidity}%`;
      wind.innerHTML = `${parseInt(json.current.wind_speed)} KMH`;
    })
    .catch(() => {
      alert('Unable to fetch weather data. Please try again later.');
    });
});
