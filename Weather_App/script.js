'use strict';

let forecastPeriods = [];
const header = document.querySelector('.test');
const body = document.querySelector('.test2');
const section = document.querySelector('.head');

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
  forecastPeriods = [...result.properties.periods];
  updateData(forecastPeriods);
});

function updateData(forecast) {
  forecast.forEach((period) => {
    const forecastImg = document.createElement('img');
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast__div');
    const forecastPeriod = document.createElement('h1');
    forecastPeriod.classList.add('forecast__day');
    const forecastDetails = document.createElement('p');
    forecastDetails.classList.add('forecast__details');
    forecastPeriod.innerHTML = period.name;
    forecastDetails.innerHTML = period.detailedForecast;
    forecastImg.src = period.icon;
    section.append(forecastDiv);
    forecastDiv.append(forecastPeriod);
    forecastDiv.append(forecastDetails);
    forecastDiv.append(forecastImg);
  });
}
