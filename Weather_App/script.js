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
    const high = getHighTemp(period.detailedForecast);
    const forecastDiv = createForecastDiv();
    const forecastImg = createForecastImg(period.icon);
    const forecastPeriod = createForecastPeriod(period.name);
    const forecastHigh = createForecastHigh(period.detailedForecast);
    const forecastDetails = createForecastDetails(period.detailedForecast);
    section.append(forecastDiv);
    forecastDiv.append(forecastPeriod, forecastDetails, forecastImg);
    if (high != undefined) {
      forecastDiv.append(forecastHigh);
    }
  });
}

function createForecastDiv() {
  const div = document.createElement('div');
  div.classList.add('forecast__div');
  return div;
}

function createForecastImg(src) {
  const img = document.createElement('img');
  img.classList.add('forecast__img');
  img.src = src;
  return img;
}
function createForecastHigh(details) {
  const high = document.createElement('p');
  high.classList.add('forecast__high');
  high.textContent = `High: ${getHighTemp(details)}`;
  return high;
}
function createForecastPeriod(name) {
  const h1 = document.createElement('h1');
  h1.classList.add('forecast__day');
  h1.textContent = name;
  return h1;
}

function createForecastDetails(details) {
  const p = document.createElement('p');
  p.classList.add('forecast__details');
  p.textContent = details;
  return p;
}

function getHighTemp(detailedForecast) {
  const startingIndex = detailedForecast.indexOf('near') + 5;
  if (detailedForecast.indexOf('near') != -1) {
    const highTemp = detailedForecast.slice(startingIndex, startingIndex + 2);
    return highTemp;
  }
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
