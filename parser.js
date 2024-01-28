const axios = require('axios');
const { properDate, properTime, getIconURL, degreesToDirection } = require('./formatter');
require('dotenv').config()

const openWeatherAPIKey = process.env.openWeatherAPIKey;
const forecastAPIKey = process.env.API_KEY;

const getWeather = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${openWeatherAPIKey}`;
    const response = await axios.get(url)
        .then(response => response.data)
        .catch(error => console.log(error));
    if (response) {
        response.weather[0].iconURL = getIconURL(response.weather[0].icon);
        response.wind.dir = degreesToDirection(response.wind.deg);
        response.sys.sunrise = properTime(response.sys.sunrise);
        response.sys.sunset = properTime(response.sys.sunset);
    }
    return response;
}

const getForecast = async(city) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=14&appid=${forecastAPIKey}`
    const response = await axios.get(url)
      .then(response => response.data)
      .catch(error => console.log(error))
    response.list.forEach(elem => {
      elem.dt = properDate(elem.dt)
      elem.weather[0].iconURL = getIconURL(elem.weather[0].icon)
      elem.deg = degreesToDirection(elem.deg)
      elem.sunrise = properTime(elem.sunrise)
      elem.sunset = properTime(elem.sunset)
    })
    console.log(response)
    return response
  }

module.exports = {
    getWeather,
    getForecast
}