## Typing Of A Dead

Typing Of A Dead is an action-packed typing game where you eliminate waves of zombies by typing the correct words. Each word you type delivers a strike, keeping the undead at bay. Test your accuracy and speed. Will your typing skills be enough to survive the apocalypse?

## Tutorial

When the game loads, press Start to start the game.
There will be a short delay before the game fully begins.
<img src='./source/media/img/git-homescreen.png'>

<br>
<h3>Game On:</h3>
The background music will start playing, and the first zombie will appear.


<br>
<h3>How to Kill Zombies:</h3>
Type the displayed words accurately on your keyboard to kill the zombies.
No need to click anywhere on the screen—just start typing to play.

<br>

Once you're done playing, your score will be saved automatically.
To view the leaderboard, go to the Menu and click the Leaderboard button.

<img src='./source/media/img/git-gamescreen.png'>



## Code Highlights

RandomPos() is responsible for positioning the new zombie in a random location on the screen. This is achieved by dynamically adjusting the CSS inset property.
<br>
compare() handles two key tasks: it removes words you’ve correctly typed and checks if all the required words have been entered correctly. Additionally, this function triggers music when a word is typed correctly or when all words are completed successfully.
<br>
newWord() retrieves the next word from the word bank and displays it in the typing prompt for the player to type.
```javascript
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
  currentWord.innerText = wordBank[score];
  wordInput.innerText = wordBank[score];
  zombie.classList.remove(zombieImg[prevZombie]);
  zombie.classList.add(zombieImg[getImg]);
  prevZombie = getImg;
}

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

```
<br><br>
compare() is called by an event listener whenever the user inputs something.
<br>
setInterval() counts down the timer, and once it reaches 0, it resets the score, updates the leaderboard with the new score, and switches back to the menu.
```javascipt

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
    printScore();
    switchScreen(false); 
    reset();
  }

  //looping home music
  countTime++; {
    if (countTime === 140) {
      homeMusic.currentTime = 0;
      countTime = 0;
    }
  }
}, 1000);
```
