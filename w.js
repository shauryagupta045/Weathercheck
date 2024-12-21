const container = document.querySelector('.container');
const search = document.querySelector('.search-box   button');
const weatherbox =document.querySelector('.weather-box');
const weatherdetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');



search.addEventListener('click',() =>{
  
 const APIkey = '394ffbca71ef42a4457b8b6f8fa9656b';
 const city = document.querySelector('.search-box  input').value;

 if(city == " ")
    return;

 fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city}&units=metric&appid=${APIkey}`)
 
.then(response => response.json()).then(json => {


    if(json.cod== '404'){
        container.style.height= '400px';
        weatherbox.classList.remove('active');
        weatherdetails.classList.remove('active');
        error404.classList.add('active');
        return;
    }
    
    container.style.height= '550px';
    weatherbox.classList.add('active');
    weatherdetails.classList.add('active');
    error404.classList.remove('active');

    

    const image = document.querySelector('.weather-box  img');
    const temperature = document.querySelector('.weather-box   .temperature');
    const description   = document.querySelector('.weather-box  .description');
    const humidity = document.querySelector('.weather-details  .humidity  span');
    const wind  = document.querySelector('.weather-details  .wind  span');

    switch (json.weather[0].main) {
        case 'Clear':
            image.src= './weatherpics/clear-01.png';
             break;


        case 'Rain':
                image.src= './weatherpics/rain-01.png';
                 break;
        
     case 'Snow':
     image.src= './weatherpics/snow-01.png';
        break;
            
        case 'Clouds':
            image.src= './weatherpics/cloudy-01.png';
             break;
    
             case 'Mist':
                image.src= './weatherpics/haze-01.png';
                 break;


                 case 'Haze':
                    image.src= './weatherpics/haze-01.png';
                     break;


                     case 'Storm':
                        image.src= './weatherpics/storm-01.png';
                         break;
                

        default:
            image.src='./weatherpics/storm-01.png';

    }


    temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    description.innerHTML = `${json.weather[0].description}`;
    humidity.innerHTML = `${json.main.humidity}%`;
    wind.innerHTML = `${parseInt(json.wind.speed)} KMH`;

});

});