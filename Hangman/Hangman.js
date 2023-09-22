// Storing the words for the game
const words = [
  "welcome", "csi", "website",
  "developer", "event", "butterfly"
];

// Selecting a random word from the list
const randomIndex = Math.floor(Math.random() * words.length);
const selectedWord = words[randomIndex];

// Variables for the game
let guessedLetters = [];
let incorrectGuessCount = 0;

// Function to display the word with guessed letters
function displayGuessedWord() {
  let displayedWord = '';
  for (const letter of selectedWord) {
    if (guessedLetters.includes(letter)) {
      displayedWord += letter + ' ';
    } else {
      displayedWord += '_ ';
    }
  }
  console.log(displayedWord);
}

// Function to make a guess
function guessLetter(letter) {
  if (letter.length !== 1 || !letter.match(/[a-z]/)) {
    console.log("Invalid input. Please enter a valid letter.");
    return;
  }

  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);
  } else {
    console.log("You already guessed that letter.");
    return;
  }

  console.log("Your Guesses:");
  console.log(guessedLetters);

  if (!selectedWord.includes(letter)) {
    incorrectGuessCount++;
  }
  console.log("Tries Left: " + (6 - incorrectGuessCount));

  displayHangman();

  if (incorrectGuessCount >= 6) {
    console.log("Game Over");
    console.log("The Word was " + selectedWord);
    return;
  }
}

// Function to display the hangman
function displayHangman() {
  switch (incorrectGuessCount) {
    case 0:
      console.log(" +---+");
      console.log("     |");
      console.log("     |");
      console.log("     |");
      console.log("======");
      break;
    case 1:
      console.log(" +---+");
      console.log(" o   |");
      console.log("     |");
      console.log("     |");
      console.log("======");
      break;
    case 2:
      console.log(" +---+");
      console.log(" o   |");
      console.log(" |   |");
      console.log("     |");
      console.log("======");
      break;
    case 3:
      console.log(" +---+");
      console.log(" o   |");
      console.log("/|   |");
      console.log("     |");
      console.log("======");
      break;
    case 4:
      console.log(" +---+");
      console.log(" o   |");
      console.log("/|\\  |");
      console.log("     |");
      console.log("======");
      break;
    case 5:
      console.log(" +---+");
      console.log(" o   |");
      console.log("/|\\  |");
      console.log("/    |");
      console.log("======");
      break;
    case 6:
      console.log(" +---+");
      console.log(" o   |");
      console.log("/|\\  |");
      console.log("/ \\  |");
      console.log("======");
      break;
  }
}

// Function to check if the game is won
function isGameWon() {
  return selectedWord.split('').every(letter => guessedLetters.includes(letter));
}

// Function to start the game
function startGame() {
  console.log("Welcome to Hangman");

  let gameOn = true;

  while (gameOn) {
    displayGuessedWord();

    if (isGameWon()) {
      console.log("You Win!!");
      gameOn = false;
      break;
    }

    let input = prompt("Guess a Letter");
    guessLetter(input);

    if (incorrectGuessCount >= 6 || isGameWon()) {
      gameOn = false;
    }
  }
}

// Start the game
startGame();
