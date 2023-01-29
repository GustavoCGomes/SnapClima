
// Interação
const citySearchInput = document.getElementById('city-search-input');
const citySearchButton = document.getElementById('city-search-button');

// Exibição
const currentDate = document.getElementById('current-date');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon')
const weatherDescription = document.getElementById('weather-descriptio');
const currentTemperature = document.getElementById('current-temperature');
const windSpeed = document.getElementById('wind-speed');
const feelsLikeTemperature = document.getElementById('feels-like-temperature');
const currentHumidity = document.getElementById('current-humidity');
const sunriseTime = document.getElementById('sunrise-time');
const sunsetTime = document.getElementById('sunset-time');

const api_key = "af614aeb6781ada34d426400117ab06e";

citySearchButton.addEventListener("click", () => { //função anonima
  
  let cityName = (citySearchInput.value) //usar let porque permiti alterar valor
  getCityWeather(cityName)
});

// https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid={api_key}

navigator.geolocation.getCurrentPosition( //localização do usuario
  (position) => {
    let lat = position.coords.latitude
    let lon = position.coords.longitude
    
    getCurrentLocationWeather(lat, lon)
    
  },
  (err) => { 
    if (err.code === 1) {
    alert("Geolocalização negada pelo usuário, busque manualmente por uma cidade através da barra de pesquisa.")
    } else { 
      console.log(err);
    } 
  }
);

function getCurrentLocationWeather(lat, lon) { //Buscarr os dados da API
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pt_br&appid=${api_key}`)
    // `crazy permiti colocar no meio de texto variaveis`
    .then((response) => response.json())
    .then((data) => displayWeather(data))
}

function getCityWeather(cityName) { //Buscar localização e imagem do tempo

  weatherIcon.src = `imagens/assets/loading-icon.svg`; 

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&lang=pt_br&appid=${api_key}`)
    // `crazy permiti colocar no meio de texto variaveis`
    .then((response) => response.json())
    .then((data) => displayWeather(data))
} 

function displayWeather(data) { //Buscar dados desejados
  let {
    dt,
    name,
    weather: [{ icon, description }],
    main: { temp, feels_like, humidity },
    wind: { speed },
    sys: { sunrise, sunset },
  } = data // desestruturação de objetos

  currentDate.textContent = formatDate(dt);
  cityName.textContent = name;
  weatherIcon.src = `imagens/assets/${icon}.svg`; 
  weatherDescription.textContent = description;
  currentTemperature.textContent = `${Math.round(temp)}ºC`;
  windSpeed.textContent = `${Math.round(speed * 3.6)}km/h`;
  feelsLikeTemperature.textContent =`${Math.round(feels_like)}ºC` ;
  currentHumidity.textContent = `${humidity}%`;
  sunriseTime.textContent = formatTime(sunrise);
  sunsetTime.textContent = formatTime(sunset);
}

function formatDate(epochTime) { // Conversão de formato de data
  let date = new Date(epochTime * 1000);
  let formattedDate = date.toLocaleDateString('pt-BR', { month: "long", day: 'numeric' })
  return `Hoje, ${formattedDate}`
}

function formatTime(epochTime) { // Converrsão de horas
  let date = new Date(epochTime * 1000);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return `${hours}:${minutes}`
}
