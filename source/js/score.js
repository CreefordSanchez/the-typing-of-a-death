'use strict';

import { selector, selectorAll, style, listener } from "./data/utility.js";
import { score } from "./script.js";


const scoreList = selector('.score-list');

//Printing screen functions 
export function printScore() {
  let newScore = `${score}|${getTime()}|${getDate()}`;
  console.log(newScore);
}

function createScoreElements(hitValue, timeValue, dateValue) {
  if (score > 0) {
    const hits = document.createElement('p');
    const time = document.createElement('p');
    const date = document.createElement('p');
    const box = document.createElement('div');

    hits.innerText = hitValue;
    time.innerText = timeValue;
    date.innerText = dateValue;

    box.appendChild(hits);
    box.appendChild(time);
    box.appendChild(date);

    scoreList.prepend(box);
  }
}
function getDate() {
  const option = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }

  return new Date().toLocaleDateString('en-ca', option);
}

function getTime() {
  const date = new Date();
  let hour = date.getHours();
  let min = String(date.getMinutes()).padStart(2, '0');
  let amPm = hour >= 12 ? 'PM' : 'AM';

  hour %= 12;
  if (hour === 0) hour = 12;
  return `${hour}:${min} ${amPm}`;
}
