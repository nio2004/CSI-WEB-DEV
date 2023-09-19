//instructions of game
console.log("Welcome to the Hangman Game.");

//array of word. word will be chosen from this array for user to guess it.
let word_array = [ "HTML","CSS","JavaScript","C","PHP","PYTHON","Ruby","Java","Kotlin","SQL","Perl"];

var lives = 5; // total lives for player
var guessed_word = [];//array to store the current guessed letters in the word
var guessed_letters = [];//array to store letters the user has guessed 
let selected_word = "";//stores the word that the user has to guess
let lives_left = lives;//to store lives left after user enters wrong letter

//function to generate random word from given list of words to be guesses by user
function chooseRandomWord(){
    const randomIndex = Math.floor(Math.random() * word_array.length);//random index in array word-array is generated
    return word_array[randomIndex];//returns the selected word from word_array array
}

//function to initialize the game
function initialize_game(){
    selected_word = chooseRandomWord();//calls the function chooseRandomWord and stores the returned value in variable selected_word
    guessed_word = Array(selected_word.length).fill('_');//adds _ to letters to be guessed by user 
    guessed_letters = [];//clears the array
    lives_left = lives;//resets the number of lives
    console.log("Guess the given word.");
    console.log("Word guessed - " + guessed_word.join(' '));
}

//function to check the guessed letter
function check_guess(guess) {
    guessed_letters.push(guess);//adds the letter entered by user to array guessed_letters
    //checks whether the entered letter is in word or not
    if(selected_word.includes(guess)){
        for (let i = 0; i < selected_word.length; i++) {//iterates thorugh the array selected_word to check if letter stored in guess is in word or not
            if (selected_word[i] === guess) {//if true then updated the letter in guessed_word array
                guessed_word[i] = guess;
            }
        }
    }else {//if letter is not in the word then lives are decremented
        lives_left--;
        console.log("Wrong guess!!! Lives left = ",lives_left);
    }

    console.log("Word guessed - " + guessed_word.join(' '));

    //checks whether the user won or lost the game
    if (lives_left === 0) {//lives over, game over 
        console.log("Game Over. You Lost! Try Again.\nThe word was - ",selected_word);
        reset_game();//resets the game
    }else if (!guessed_word.includes("_")) {//word guessed correctly, won the game
        console.log("Congrats!!! You the Game!! You guessed the right word - ",selected_word);
        reset_game();//resets the game
    }
}

//function to restart the game
function reset_game(){
    const play_again = prompt("Do you wish to play the game again? (Y/N)");//gets input form user whther he wants to play the game again or not
    if (play_again === 'Y' || play_again === 'y'){//if yes the answer then starts the game again
        initialize_game();
    }else {//exits the game
        console.log("Thank you for playing the game! Bye Bye!!!");
    }
}

//function to start the game
function start_game(){
    initialize_game();//sets the initial state of game
    //continues the loop as long as lives are not 0 and guessed_word contains the '_'
    while (lives_left > 0 && guessed_word.includes("_")) {
        const guess = prompt("Enter the single letter: ");
        hangman_bana(lives_left);
        
        //checks if the input from user is single letter, either uppercase or lowercase
        if (guess.length !== 1 || !/^[A-Z, a-z]$/.test(guess)) {
            console.log("Please enter a valid letter.");
            hangman_bana(lives_left);
            continue;
        }

        //checks if the user entered the already guessed letter 
        if (guessed_letters.includes(guess)) {
            console.log("You already guessed that letter.");
            hangman_bana(lives_left);
            continue;
        }

        //updates the game state
        check_guess(guess);
    }
}

function hangman_bana(lives){
    switch (lives) {
        case 5:
            console.log(" +--+\n O   |\n   |\n    |\n========");
            break;
        
        case 4:
            console.log(" +--+\n O  |\n |  |\n    |\n========");
            break;

        case 3:
            console.log(" +--+\n O  |\n/|  |\n    |\n========");
            break;

        case 2:
            console.log(" +--+\n O   |\n/|\\  |\n/    |\n========");
            break;

        case 1:
            console.log(" +--+\n O   |\n/|\\  |\n/ \\  |\n========");
            break;

        case 0:
            console.log(" +--+\n O   |\n/|\\  |\n/ \\  |\n========");
            break;
    }
}

//starts the game
start_game();