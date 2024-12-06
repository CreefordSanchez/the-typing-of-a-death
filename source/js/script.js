'use strict';

import { wordBank } from "./data/word-bank.js";
import { selector, selectorAll, style, listener } from "./data/utility.js";
import { printScore } from "./score.js";

const body = selector('body');

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
export let score = 0;
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

//Switching screen functions
function reset() {
  startGame = false;
  timeLimit = 100;
  timeCount.innerText = '---';
  gameMusic.pause();
  gameMusic.currentTime = 0;
  homeMusic.currentTime = 0;
  scoreCount.innerText = 0;
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
