'use strict';
const goBtn = document.querySelector('.btn');

let forecastPeriods = [];
const pointCoords = new Map();
const cityCoords = new Map();
const header = document.querySelector('.test');
const body = document.querySelector('.test2');
const section = document.querySelector('.head');

goBtn.addEventListener('click', function () {
  deleteData();
  const city = document.querySelector('.city').value;
  const state = document.querySelector('.state').value;
  console.log(city);
  getCoords(city, state).then((result) => {
    cityCoords.set('lat', result[0].latitude);
    cityCoords.set('long', result[0].longitude);
    getPoints().then((result) => {
      const info = result.properties;
      pointCoords.set('cwa', info.cwa);
      pointCoords.set('gridX', info.gridX);
      pointCoords.set('gridY', info.gridY);
      console.log(pointCoords);
      getWeather().then((result) => {
        forecastPeriods = [...result.properties.periods];
        updateData(forecastPeriods);
      });
    });
  });
});

async function getCoords(city, state) {
  const coordCall = await fetch(
    'https://api.api-ninjas.com/v1/geocoding?city=' +
      city +
      '&country=US&state=' +
      state,
    {
      method: 'GET',
      headers: { 'X-Api-Key': 'Lsoq2xZc85gy2poCTDXi5Q==YFygkblE6eW2BFPx' },
    }
  );
  return await coordCall.json();
}

async function getPoints() {
  const pointCall = await fetch(
    'https://api.weather.gov/points/' +
      Math.floor(cityCoords.get('lat')) +
      ',' +
      Math.floor(cityCoords.get('long'))
  );

  return await pointCall.json();
}

async function getWeather() {
  const weatherCall = await fetch(
    'https://api.weather.gov/gridpoints/' +
      pointCoords.get('cwa') +
      '/' +
      pointCoords.get('gridX') +
      ',' +
      pointCoords.get('gridY') +
      '/forecast',
    {
      method: 'GET',
      headers: {},
    }
  );
  return await weatherCall.json();
}

function updateData(forecast) {
  forecast.forEach((period) => {
    const forecastImg = document.createElement('img');
    forecastImg.classList.add('forecast__img');
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

function deleteData() {
  const removeImg = document.querySelectorAll('.forecast__img');
  const removeDiv = document.querySelectorAll('.forecast__div');
  const removePeriod = document.querySelectorAll('.forecast__day');
  const removeDetails = document.querySelectorAll('.forecast__details');
  removeImg.forEach((img) => img.remove());
  removeDiv.forEach((div) => div.remove());
  removePeriod.forEach((period) => period.remove());
  removeDetails.forEach((details) => details.remove());
}
