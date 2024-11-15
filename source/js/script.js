'use strict';

const wordBank = [
  'dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building',
  'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money',
  'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow',
  'bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer',
  'philosophy', 'database', 'periodic', 'capitalism', 'abominable', 'phone',
  'component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada',
  'velvet', 'potion', 'treasure', 'beacon', 'labyrinth', 'whisper', 'breeze',
  'coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology',
  'alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake',
  'baseball', 'beyond', 'evolution', 'banana', 'perfume', 'computer',
  'butterfly', 'discovery', 'ambition', 'music', 'eagle', 'crown',
  'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'door', 'bird',
  'superman', 'library', 'unboxing', 'bookstore', 'language', 'homework',
  'beach', 'economy', 'interview', 'awesome', 'challenge', 'science',
  'mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software',
  'update', 'yellow', 'keyboard', 'window', 'beans', 'truck', 'sheep',
  'blossom', 'secret', 'wonder', 'enchantment', 'destiny', 'quest', 'sanctuary',
  'download', 'blue', 'actor', 'desk', 'watch', 'giraffe', 'brazil',
  'audio', 'school', 'detective', 'hero', 'progress', 'winter', 'passion',
  'rebel', 'amber', 'jacket', 'article', 'paradox', 'social', 'resort',
  'mask', 'escape', 'promise', 'band', 'level', 'hope', 'moonlight', 'media',
  'orchestra', 'volcano', 'guitar', 'raindrop', 'inspiration', 'diamond',
  'illusion', 'firefly', 'ocean', 'cascade', 'journey', 'laughter', 'horizon',
  'exploration', 'serendipity', 'infinity', 'silhouette', 'wanderlust',
  'marvel', 'nostalgia', 'serenity', 'reflection', 'twilight', 'harmony',
  'symphony', 'solitude', 'essence', 'melancholy', 'melody', 'vision',
  'silence', 'whimsical', 'eternity', 'cathedral', 'embrace', 'poet', 'ricochet',
  'mountain', 'dance', 'sunrise', 'dragon', 'adventure', 'galaxy', 'echo',
  'fantasy', 'radiant', 'serene', 'legend', 'starlight', 'light', 'pressure',
  'bread', 'cake', 'caramel', 'juice', 'mouse', 'charger', 'pillow', 'candle',
  'film', 'jupiter'
];

function selector(selector) {
  return document.querySelector(selector);
} 

function selectorAll(selector) {
  return document.querySelectorAll(selector);
} 

function listener(selector, event, callBack) {
  return selector.addEventListener(event, callBack);
}

const doorOpen = selector('.open-door');
const screen = selector('main');
const button = selector('button');
let validRestart = false;
let scoreCount = 0;
let timerCount = 100;
let test = { bool: false }; 
listener(button, 'click', () => {
  if (validRestart) {
    //game restarting
    fadeOut('none', 'inline', 'Start');
    validRestart = false;
    willWait = true;
    // call method as it will reset the timer when restart is clicked
    startGame();   
  } else {
    //game started
    fadeOut('inline', 'none', 'Restart');
    validRestart = true;
    newTarget();
    randomPos();
  }
});

let willWait = true;
setInterval(() => {
  if (validRestart && willWait) {
    setTimeout(() => {
      willWait = false;
    }, 1000);
  } 
  if (!willWait) {
    startGame();
  }
}, 1000);

function startGame() {
  input.focus();
  if(validRestart) {
    timerCount--;
    timer.innerText = timerCount;
    zombie.style.display = 'inline';
  } 
  if (!validRestart || timerCount === 0) {
    timerCount = 10;
    timer.innerText = '--';
    score.innerText = '0';
    validRestart = false;
    willWait = true
    zombie.style.display = 'none';
    fadeOut('none', 'inline', 'Start');
    createScore();
  }
}

const outside = selector('.outside');
const inside = selector('.inside');
const timer = selector('.timer');
const title = selector('h1');
function fadeOut(outDisplay, inDisplay, buttonStatus) {
  screen.style.opacity = '0';
  setTimeout(() => {
    doorOpen.play();
  }, 1000);

  setTimeout(() => {
    changeScene(outDisplay, inDisplay, buttonStatus);
  }, 2000);
}

function changeScene(outDisplay, inDisplay, buttonStatus) {
  outside.style.display = outDisplay;
  timer.style.display = outDisplay;
  title.style.display = inDisplay;
  inside.style.display = inDisplay;
  button.innerText = buttonStatus; 
  screen.style.opacity = '1';
}

const zombie = selector('.target-container');
const input = selector('input');
const targetInput = selector('.target-type');
const targetText = selector('.sentence');

listener(input, 'input', () => {
  let inputValue = input.value;
  let inputChar = inputValue.slice(-1);
  compare(inputChar);
  killZombie();
});

const gunshots = selector('.gunshots');
function compare(char) {
  let targetText = targetInput.innerText;
  if (targetText[0] === char.toLowerCase()) {
    gunshots.currentTime = 0.1;
    gunshots.play();
    targetInput.innerText = targetText.slice(1);
  }
}

const dieSound = selector('.kill-sound');
const score = selector('.score');
function killZombie() {
  if (targetInput.innerText === '') {
   newTarget();
   randomPos();
   scoreCount++;
   score.innerText = scoreCount;
   dieSound.currentTime = 0.1;
   dieSound.play();
  }
}

function newTarget() {
  targetText.innerText = wordBank[random(0, wordBank.length -1)];
  targetInput.innerText = targetText.innerText;
}
function randomPos() {
  let y = random(30, 40);
  let x = random(0, 80);
  zombie.style.inset = `${y}% 0 0 ${x}%`;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const scoreBoard = [];
function createScore() {
  let dateNow = findDate();
  let calcPercentage = (scoreCount / wordBank.length) * 100;
  let percentage = `${calcPercentage}%`;
  const newScore = new Score(scoreCount, percentage, dateNow);
  scoreCount = 0;
  
  scoreBoard.push(newScore);
  console.log(scoreBoard);
}

function findDate() {
  const date = new Date();
  const year = String(date.getFullYear()).slice(-2);
  // add 0 if encounter single digits
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}/${month}/${day}`;
}
class Score {
  #score;
  #percentage;
  #date;
  constructor(score, percentage, date) {
    this.#score = score;
    this.#percentage = percentage;
    this.#date = date;
  }

  get score() { return this.#score; }
  get percentage() { return this.#percentage; }
  get date() { return this.#date; }
}