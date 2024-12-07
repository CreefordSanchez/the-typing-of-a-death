'use strict';

import { selector, selectorAll, style, listener } from "./data/utility.js";
import { score } from "./script.js";


const scoreList = selector('.score-list');

listener(window, 'load', () => {
  validate();
});

export function printScore() {
  scoreList.innerHTML = '';
  setNewItem();
  validate();
}

function setNewItem() {
  if (score > 0) {    
    const id = Date.now();
    let newScore = `${score}|${getTime()}|${getDate()}`;
    localStorage.setItem(`${id}`,`${newScore}`);
  }
}

function validate() {
  if (localStorage.length === 0) {
    scoreList.classList.add('center-score-msgg');
    scoreList.innerHTML = '<p>No Scores Yet</p>';
    return false;
  } 

  scoreList.classList.remove('center-score-msgg');
  scoreStorage();    
  return true;
}

function scoreStorage() {
  const scoreList = Object.values(localStorage); 
  orderList(scoreList);

  scoreList.forEach(value => {
    const placeHolder = value.split('|');
    createScoreElements(placeHolder[0], placeHolder[1], placeHolder[2]);
  })
}

//example ['11|2232|1223', '2|654|34']
function orderList(scoreList) {
  scoreList.sort((a, b) => {
    let A = a.split('|')[0];
    let B = b.split('|')[0];
    return B - A;
  });
}

function createScoreElements(hitValue, timeValue, dateValue) {
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

    scoreList.appendChild(box);
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
