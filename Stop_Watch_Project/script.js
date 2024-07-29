"use strict";
let intervalId;
let sec = 0;
let min = 0;

const updateTimer = function (minute, second) {
  let timer = `${minute < 10 ? "0" + minute : minute}:${
    second < 10 ? "0" + second : second
  }`;
  document.querySelector(".timer").textContent = timer;
};

const startTimer = function () {
  intervalId = setInterval(function () {
    sec++;
    if (sec === 60) {
      sec = 0;
      min++;
    }
    updateTimer(min, sec);
  }, 1000);
};
const pauseTimer = function () {
  const btnText = document.querySelector(".pause").textContent;
  if (btnText == "PAUSE TIMER") {
    clearInterval(intervalId);
    document.querySelector(".pause").textContent = "UNPAUSE TIMER";
  } else {
    startTimer();
    document.querySelector(".pause").textContent = "PAUSE TIMER";
  }
};

const stopTimer = function () {
  sec = 0;
  min = 0;
  clearInterval(intervalId);
  updateTimer(min, sec);
};

document.querySelector(".start").addEventListener("click", startTimer);
document.querySelector(".pause").addEventListener("click", pauseTimer);
document.querySelector(".stop").addEventListener("click", stopTimer);
