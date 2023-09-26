const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const words = ["hangman", "computer", "programming", "cryptography", "openai"];
let word = words[Math.floor(Math.random() * words.length)];
let display = "_".repeat(word.length);
let incorrectGuesses = 0;

function drawHangman(incorrectGuesses) {
    switch (incorrectGuesses) {
        case 6:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |   /|\\");
            console.log(" |   / \\");
            console.log(" |");
            break;
        case 5:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |   /|\\");
            console.log(" |   /");
            console.log(" |");
            break;
        case 4:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |   /|\\");
            console.log(" |");
            console.log(" |");
            break;
        case 3:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |   /|\\");
            console.log(" |");
            console.log(" |");
            break;
        case 2:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |   /|");
            console.log(" |");
            console.log(" |");
            break;
        case 1:
            console.log("  __");
            console.log(" |    |");
            console.log(" |    O");
            console.log(" |    |");
            console.log(" |");
            console.log(" |");
            break;
        case 0:
            console.log("  __");
            console.log(" |    |");
            console.log(" |");
            console.log(" |");
            console.log(" |");
            console.log(" |");
            break;
    }
}

function isLetterInWord(letter, word) {
    return word.includes(letter);
}

function updateDisplayString(letter, word, display) {
    let updatedDisplay = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === letter) {
            updatedDisplay += letter;
        } else {
            updatedDisplay += display[i];
        }
    }
    return updatedDisplay;
}

function playGame() {
    console.log("Welcome to Hangman!");
    rl.setPrompt(`Current word: ${display}\nIncorrect guesses left: ${6 - incorrectGuesses}\nGuess a letter: `);
    rl.prompt();

    rl.on('line', (input) => {
        let guess = input.trim();

        if (guess.length !== 1 || !/[a-zA-Z]/.test(guess)) {
            console.log("Invalid input. Please enter a single letter.");
        } else {
            guess = guess.toLowerCase();
            if (isLetterInWord(guess, word)) {
                display = updateDisplayString(guess, word, display);
                if (display === word) {
                    console.log(`Congratulations! You guessed the word: ${word}`);
                    rl.close();
                } else {
                    rl.prompt();
                }
            } else {
                incorrectGuesses++;
                drawHangman(incorrectGuesses);
                if (incorrectGuesses === 6) {
                    console.log(`You've run out of attempts. The word was: ${word}`);
                    rl.close();
                } else {
                    rl.prompt();
                }
            }
        }
    });
}

playGame();