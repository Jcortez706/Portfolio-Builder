'use strict';

async function getWeather() {
  const weatherCall = await fetch(
    'https://api.weather.gov/gridpoints/FFC/70,82/forecast',
    {
      method: 'GET',
      headers: {},
    }
  );
  return await weatherCall.json();
}
getWeather().then((result) => {
  const forecastName = result.properties.periods[0].name;
  const forecast = result.properties.periods[0].detailedForecast;
  console.log(forecastName);

  document.querySelector('.test').textContent = forecastName;
  document.querySelector('.test2').textContent = forecast;
});
