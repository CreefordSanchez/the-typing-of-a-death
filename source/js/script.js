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
const scoreList = selector('.score-list');

//buttons
const startBtn = selector('.start');
const endBtn = selector('.restart');
const enterBtn = selector('.enter');
const scoreBtn = selector('.leader-board');
const closeScoreBtn = selector('.return-home-btn');

//screens
const enterScreen = selector('.press-enter-screen');
const gameScreen = selector('.gameplay');
const homeScreen = selector('.home');
const homeContent = selector('.home-content');
const boardContent = selector('.score-board-content');

//Variables essential for killing zombies
const timeCount = selector('.time');
const zombie = selector('.zombie');
const zombieImg = ['mummy-zombie', 'granny-zombie', 'lady-zombie'];
const currentWord = selector('.word');
const wordInput = selector('.word-input');
const userInput = selector('input');
const scoreCount = selector('span');

//music 
const gameMusic = new Audio('./source/media/audio/battle-music.mp3');
const gunshots = new Audio('./source/media/audio/gunshots.wav');
const deadSound = new Audio('./source/media/audio/death-sounds.wav');
const homeMusic = new Audio('./source/media/audio/home-music.mp3');

let startGame = false;
let timeLimit = 100;
let prevZombie = 0;
let score = 0;
let countTime = 0;

gunshots.volume = 0.2;
gameMusic.volume = 0.5;
homeMusic.volume = 0.1;
deadSound.volume = 0.5;

listener(scoreBtn, 'click', () => {
  homeContent.style.display = 'none';
  boardContent.style.display = 'flex';
});

listener(closeScoreBtn, 'click', () => {
   homeContent.style.display = 'flex';
  boardContent.style.display = 'none';
});

listener(enterBtn, 'click', () => {
  homeMusic.play();
  homeScreen.style.display = 'block';
  enterScreen.style.display = 'none';
});

listener(body, 'click', () => {
  userInput.focus();
});

listener(startBtn, 'click', () => {
  randomPos();
  newWord();
  switchScreen(true);
  homeMusic.pause();

  setTimeout(() => {
    gameMusic.play();
    startGame = true;
  },3000);
});

listener(endBtn, 'click', () => {
  printScore();
  switchScreen(false);
  reset();
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
    printScore();
  }

  //looping home music
  countTime++; {
    if (countTime === 140) {
      homeMusic.currentTime = 0;
      countTime = 0;
    }
  }
}, 1000);

//Zombie killing functions
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
    gunshots.currentTime = 0.1;
    gunshots.play();
    wordInput.innerText = targetText.slice(1);
  }

  if (wordInput.innerText === '') {
    randomPos();
    newWord();
    deadSound.currentTime = 0;
    deadSound.play();
    score++;
    scoreCount.innerText = score;
  }
}

function newWord() {
  let getImg = random(0, zombieImg.length-1);
  let getWord = random(0, wordBank.length-1);
  currentWord.innerText = wordBank[getWord];
  wordInput.innerText = wordBank[getWord];
  zombie.classList.remove(zombieImg[prevZombie]);
  zombie.classList.add(zombieImg[getImg]);
  prevZombie = getImg;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Printing screen functions 
function printScore() {
  if (score > 0) {
    const hits = document.createElement('p');
    const time = document.createElement('p');
    const date = document.createElement('p');
    const box = document.createElement('div');

    hits.innerText = score;
    time.innerText = getTime();
    date.innerText = getDate();

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

//Switching screen functions
function reset() {
  startGame = false;
  timeLimit = 100;
  timeCount.innerText = '---';
  gameMusic.pause();
  gameMusic.currentTime = 0;
  homeMusic.currentTime = 0;
  score = 0;
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
      homeMusic.play();
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
