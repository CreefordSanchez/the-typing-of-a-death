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

function display(selector, type) {
  return selector.style.display = type;
}

function style(selector, styleType, type) {
  return selector.style[styleType] = type
}

const body = selector('body');
const startBtn = selector('.start');
const endBtn = selector('.restart');
const gameScreen = selector('.gameplay');
const homeScreen = selector('.home');
const timeCount = selector('.time');
const zombie = selector('.zombie');
const zombieImg = ['mummy-zombie', 'granny-zombie', 'lady-zombie'];
const currentWord = selector('.word');
const wordInput = selector('.word-input');
const userInput = selector('input');
const gameMusic = new Audio('./source/media/audio/music.mp3');
const scoreBtn = selector('.leader-board');
let startGame = false;
let timeLimit = 100;
let prevZombie = 0;

listener(window, 'load', () => {
  newWord();
  randomPos();
});
listener(body, 'click', () => {
  userInput.focus();
});

listener(startBtn, 'click', () => {
 newWord();
 switchScreen(true);
 setTimeout(() => {
  gameMusic.play();
  startGame = true;
 },3000);
});

listener(endBtn, 'click', () => {
  newWord();
  randomPos();
 /* switchScreen(false);
  reset();*/
});

listener(userInput, 'input', () => {
  let getInput = userInput.value;
  let char = getInput.slice(-1);
  compare(char);
});

setInterval(() => {
  if (startGame) {
    timeLimit--;
    timeCount.innerText = timeLimit;
    userInput.focus();
  }

  if (timeLimit === 0) {
    switchScreen(false);
    reset();
  }
}, 1000);

function randomPos() {
  let screenHeight = window.innerHeight;
  let screenWidth = window.innerWidth;
  let y = random(0, screenHeight-500);
  let x = random(0, screenWidth-500);
  if (y <= 70) y = 80;
  zombie.style.inset = `${y}px auto auto ${x}px`;
}

function compare(char) {
  let targetText = wordInput.innerText;
  if (targetText[0] === char.toLowerCase()) {
    //gunshots.currentTime = 0.1;
    //gunshots.play();
    wordInput.innerText = targetText.slice(1);
  }
}

function newWord() {
  let getImg = random(0, zombieImg.length-1);
  let getWord = random(0, wordBank.length-1);
  currentWord.innerText = wordBank[getWord];
  wordInput.innerText = wordBank[getWord];
  zombie.classList.remove(zombieImg[prevZombie]);
  zombie.classList.add(zombieImg[getImg]);
  console.log(zombieImg[getImg]);
  prevZombie = getImg;
}

function reset() {
  startGame = false;
  timeLimit = 100;
  timeCount.innerText = '---';
  gameMusic.pause();
  gameMusic.currentTime = 0;
}

function switchScreen(inHome) {
  if (inHome) {
    removeScreen(homeScreen);
    setTimeout(() => {
      appearScreen(gameScreen);
    },700);
  } else {
    removeScreen(gameScreen);
    setTimeout(() => {
      appearScreen(homeScreen);
    },700);
  }
}

function appearScreen(screen) {
  style(screen, 'display', 'block');

  setTimeout(() => {
    style(screen, 'opacity', '1');
  }, 2000);
}

function removeScreen(screen) {
  style(screen, 'opacity', '0');
  setTimeout(() => {
    style(screen, 'display', 'none');
  },2000);
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
//
removeScreen(homeScreen);
appearScreen(gameScreen);

  startGame = true;

const gradeCode = selector('.set-time');
listener(gradeCode, 'click', () => {
  timerCount = 10;
  timeReset = 10;
  gunshots.currentTime = 0.1;
  gunshots.play();
});

const doorOpen = selector('.open-door');
const music = selector('.music');
const screen = selector('main');
const button = selector('button');
let validRestart = false;
let scoreCount = 0;
let timerCount = 68;
let timeReset = 68;
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
    music.play();
  } 

  if (!validRestart || timerCount === 0 || scoreCount === 200) {
    timerCount = timeReset;
    timer.innerText = '--';
    score.innerText = '0';
    validRestart = false;
    willWait = true
    zombie.style.display = 'none';
    music.pause();
    fadeOut('none', 'inline', 'Start');
    createScore();
  }
}

const scoreBoardContainer = selector('.score-board-container');
const scoreBoardBox = selector('.score-board');
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
  display(outside, outDisplay);
  display(timer, outDisplay);
  display(title, inDisplay);
  display(inside, inDisplay);
  display(scoreBoardContainer, inDisplay);
  display(gradeCode, inDisplay);
  button.innerText = buttonStatus; 
  screen.style.opacity = '1';
  //scoreBoardBox.style
  music.currentTime = 0;
}

/* Zombie killing code 
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
   input.value = '';
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

//Creating new user score 
const scoreBoard = [];
function createScore() {
  let dateNow = getDate();
  let calcPercentage = (scoreCount / wordBank.length) * 100;
  let percentage = `${Math.round(calcPercentage)}%`;
  const newScore = new Score(scoreCount, percentage, dateNow);
  scoreCount = 0;
  
  scoreBoard.push(newScore);
  printScore(newScore);
}

function printScore(newScore) {
  const newText = document.createElement('p');
  let hits = newScore.score;
  let percentage = newScore.percentage;
  let date = newScore.date;
  let score = `Hits:${hits} Percentage:${percentage} Date:${date}`;
  newText.innerText = score;

  scoreBoardBox.appendChild(newText);
}

function getDate() {
  const date = new Date();
  let year = String(date.getFullYear()).slice(-2);
  // add 0 if encounter single digits
  let month = String(date.getMonth() + 1).padStart(2, '0');
  let day = String(date.getDate()).padStart(2, '0');
  
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

  set score(score) { this.#score = score; }
  get score() { return this.#score; }

  set percentage(percentage) { this.#percentage = percentage; }
  get percentage() { return this.#percentage; }

  set date(date) { this.#date = date; }
  get date() { return this.#date; }
}*/