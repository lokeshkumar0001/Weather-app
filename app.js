const express = require("express");
const axios = require("axios");
const cors = require('cors')
const dotenv = require('dotenv')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin:'*'
}))

dotenv.config({path:'./config.env'})

app.use(express.static('public'));

// Define your weather API endpoint and API key here
const weatherApiKey = process.env.weatherApiKey;
const weatherApiUrl = `http://api.openweathermap.org/data/2.5/forecast?units=metric`;

app.post("/getWeather", async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    for (const city of cities) {
      const response = await axios.get(weatherApiUrl, {
        params: {
          appid: weatherApiKey,
          q: city,
        },
      });
      
      const temp = response.data.list[0].main.temp;
      weatherData[city] = `${temp}°C`;
    }

    console.log(weatherData);

    res.json({ weather: weatherData });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
