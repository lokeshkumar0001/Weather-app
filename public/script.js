document.addEventListener("DOMContentLoaded", () => {
  const getWeatherButton = document.getElementById("getWeatherButton");
  const cityInput = document.getElementById("cityInput");
  const weatherResults = document.getElementById("weatherResults");

  getWeatherButton.addEventListener("click", async () => {
    const cities = cityInput.value.split(",").map((city) => city.trim());
    
    if ( cities[0] === '') {
      return;
    }
    
    try {
      const response = await fetch(`${location}getWeather`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cities: cities }),
      });

      const data = await response.json();

      if (response.ok) {
        const weatherHTML = Object.keys(data.weather)
          .map((city) => `<p>${city}: ${data.weather[city]}</p>`)
          .join("");
        weatherResults.innerHTML = weatherHTML;
      } else {
        weatherResults.innerHTML = "Error fetching weather data.";
      }
    } catch (error) {
      console.error("Error:", error);
      weatherResults.innerHTML = "Error fetching weather data.";
    }
  });
});
