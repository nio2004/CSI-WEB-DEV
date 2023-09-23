// Initialize the array of words to guess
const words = ['india', 'germany', 'france', 'italy', 'russia', 'japan', 'australia'];
const maxAttempts = 6;

let currentWord = '';
let hiddenWord = [];
let guessedLetters = [];
let attempts = maxAttempts;

// Function to get a random word from the 'words' array
const getRandomWord = () => {
  return words[Math.floor(Math.random() * words.length)];
};

// Function to initialize the game
const initializeGame = () => {
  currentWord = getRandomWord();
  hiddenWord = Array(currentWord.length).fill('_');
  guessedLetters = [];
  attempts = maxAttempts;

  // Clear the console and display initial information
  console.clear();
  console.log('Welcome to Hangman!');
  console.log(`You have ${attempts} attempts to guess the word.`);
  console.log(hiddenWord.join(' '));
};

// Function to update the hidden word with correctly guessed letters
const updateHiddenWord = (letter) => {
  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === letter) {
      hiddenWord[i] = letter;
    }
  }
};

// Function to check if the player has won
const checkWin = () => {
  return hiddenWord.join('') === currentWord;
};

// Function to start and manage the game
const playGame = () => {
  initializeGame();

  // Function to make a guess
  const makeGuess = () => {
    const guess = prompt('Guess a letter:').toLowerCase();
    
    if (guessedLetters.includes(guess)) {
      console.log(`You already guessed '${guess}'.`);
    } else if (currentWord.includes(guess)) {
      guessedLetters.push(guess);
      updateHiddenWord(guess);
      console.log(hiddenWord.join(' '));
    } else {
      guessedLetters.push(guess);
      attempts--;
      console.log(`Incorrect! You have ${attempts} attempts remaining.`);
      printHangman(maxAttempts - attempts);
      console.log(hiddenWord.join(' '));
    }

    // Check for win or loss conditions
    if (checkWin()) {
      console.log('Congratulations! You won!');
      startNewGame();
    } else if (attempts === 0) {
      console.log(`Out of attempts! The word was '${currentWord}'.`);
      startNewGame();
    } else {
      makeGuess();
    }
  }

  makeGuess();
};

// Function to print a hangman figure based on the number of incorrect attempts
const printHangman = (incorrectAttempts) => {
  const hangmanFigures = [
    `
     -----
     |   |
         |
         |
         |
         |
    `,
    `
     -----
     |   |
     O   |
         |
         |
         |
    `,
    `
     -----
     |   |
     O   |
     |   |
         |
         |
    `,
    `
     -----
     |   |
     O   |
    /|   |
         |
         |
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
         |
         |
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
    /    |
         |
    `,
    `
     -----
     |   |
     O   |
    /|\\  |
    / \\  |
         |
    `,
  ];

  console.log(hangmanFigures[incorrectAttempts]);
};

// Function to start a new game
const startNewGame = () => {
  const playAgain = confirm('Play again?');
  if (playAgain) {
    playGame();
  } else {
    console.log('Thanks for playing Hangman!');
  }
};

// Start the initial game
playGame();
