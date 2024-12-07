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
    const wrapper = [];
    const id = Date.now();
    const newScore = {
      hits: score, time: getTime(), date: getDate()
    }
    wrapper.push(newScore);
    localStorage.setItem(`${id}`,JSON.stringify(wrapper));
  }
}

function getScoreList() {
  const getArr = Object.values(localStorage);
  const newArr = getArr.map(value => {
    return JSON.parse(value);
  });
  return newArr;
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
  const arrList = getScoreList();
  orderList(arrList);

  arrList.forEach(value => {
    //the object inside of an array(which is value)....
    const grabArr = value[0];
    createScoreElements(grabArr.hits, grabArr.time, grabArr.date);
  })
}

function orderList(scoreList) {
  scoreList.sort((a, b) => {
    let A = a[0].hits;
    let B = b[0].hits;
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
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };

  return new Date().toLocaleTimeString('en-US', options);
}