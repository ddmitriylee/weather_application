const express = require('express');
const path = require('path');

const { getWeather, getForecast } = require('./parser');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname + `/views/static`)));
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.redirect('/weather?city=Astana')
})

app.post('/', async(req, res) => {
    const city = req.body.city;
    res.redirect(`/weather?city=${city}`)
})

app.get(`/weather`, async (req, res) => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(req.query.city),
        getForecast(req.query.city),
      ]);
      if (weatherData) {
        res.render('index', { weather: weatherData, forecast: forecastData });
      } else {
        res.redirect(`/`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

