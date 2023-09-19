console.log("Welcome to the Hangman Game.");

let word_array = ["HTML", "CSS", "JavaScript", "C", "PHP", "PYTHON", "Ruby", "Java", "Kotlin", "SQL", "Perl"];
let lives = 5;
let guessed_word = [];
let guessed_letters = [];
let selected_word = "";
let lives_left = lives;

function chooseRandomWord() {
    const randomIndex = Math.floor(Math.random() * word_array.length);
    return word_array[randomIndex];
}

function initialize_game() {
    selected_word = chooseRandomWord();
    guessed_word = Array(selected_word.length).fill('_');
    guessed_letters = [];
    lives_left = lives;
    console.log("Guess the given word.");
    console.log("Word guessed - " + guessed_word.join(' '));
}

function check_guess(guess) {
    guessed_letters.push(guess);

    if (selected_word.includes(guess)) {
        for (let i = 0; i < selected_word.length; i++) {
            if (selected_word[i] === guess) {
                guessed_word[i] = guess;
            }
        }
    } else {
        lives_left--;
        console.log("Wrong guess!!! Lives left = ", lives_left);
    }

    console.log("Word guessed - " + guessed_word.join(' '));

    if (lives_left === 0) {
        hangman_bana(lives_left);
        console.log("Man is hanged!!!! You failed to save him. \nGame Over. You Lost! Try Again.\nThe word was - ", selected_word);
        reset_game();
    } else if (!guessed_word.includes("_")) {
        console.log("Congrats!!! You won the Game!! You guessed the right word - ", selected_word);
        reset_game();
    }
}

function reset_game() {
    const play_again = prompt("Do you wish to play the game again? (Y/N)");
    if (play_again === 'Y' || play_again === 'y') {
        initialize_game();
    } else {
        console.log("Thank you for playing the game! Bye Bye!!!");
    }
}

function start_game() {
    initialize_game();

    while (lives_left > 0 && guessed_word.includes("_")) {
        hangman_bana(lives_left);

        const guess = prompt("Enter a single letter: ");

        if (guess.length !== 1 || !/^[A-Za-z]$/.test(guess)) {
            console.log("Please enter a valid letter.");
            continue;
        }

        if (guessed_letters.includes(guess)) {
            console.log("You already guessed that letter.");
            continue;
        }

        check_guess(guess);
    }
    hangman_bana(lives_left);
}

function hangman_bana(lives) {
    switch (lives) {
        case 5:
            console.log(" +--+\n O  |\n    |\n    |\n========");
            break;

        case 4:
            console.log(" +--+\n O  |\n |  |\n    |\n========");
            break;

        case 3:
            console.log(" +--+\n O  |\n/|  |\n    |\n========");
            break;

        case 2:
            console.log(" +--+\n O   |\n/|\\  |\n     |\n========");
            break;

        case 1:
            console.log(" +--+\n O   |\n/|\\  |\n/    |\n========");
            break;

        case 0:
            console.log(" +--+\n O   |\n/|\\  |\n/ \\  |\n========");
            break;
    }
}

start_game();
