console.log("Lets play Hangman!!, Guess the secret word!!!");

//Declaring target words array. All words should be in lower case as the code converts the input characters to lower case.

let words_list = [ "rescue","gift","thunder","troll","ink","morning","school","train","sort","pyramid"];

let guessed_word = [];
let guessed_letters = []; 
let secret_word = "";
let lives = 5; 
let lives_left = lives;

//selecting a random target word from the list
function SelectSecretWord(){
    const i = Math.floor(Math.random() * words_list.length);
    return words_list[i];
}

//set the initial parameters for the game
function set_game(){
    secret_word = SelectSecretWord();
    guessed_word = Array(secret_word.length).fill('_');//gives array of underscores equal to the number of letters
    guessed_letters = [];
    lives_left = lives;
    console.log("Guess the secret word.");
    console.log("Guessed Word- " + guessed_word.join(' '));
}

//function to check the guessed letter
function check_guess(guess) {
    guessed_letters.push(guess);//adds the letter entered by user to array guessed_letters
    if(secret_word.includes(guess)){
        for (let i = 0; i < secret_word.length; i++) {//check if the letter is in the word
            if (secret_word[i] === guess) {
                guessed_word[i] = guess;//replace the underscore with the guessed letter
            }
        }
    }else {//if letter is not in the word then lives are decremented
        lives_left--;
        console.log("Wrong guess!!! Lives left = ",lives_left);
    }

    console.log("Word guessed - " + guessed_word.join(' '));

    //checks whether the user won or lost the game
    if (lives_left === 0) {//lives over, game over 
        console.log("Better luck next time \nThe correct word was - ",secret_word);
        reset_game();//resets the game
    }else if (!guessed_word.includes("_")) {//word guessed correctly, won the game
        console.log("Congrats!!! You won the Game!! You guessed the right word - ",secret_word);
        reset_game();//resets the game
    }
}

//reset the game parameters to its initial state
function reset_game(){
    const play_again = prompt("Do you want to play? (Y/N)");
    if (play_again === 'Y' || play_again === 'y'){
        set_game();
    }
    
}

//function to start the game
function start_game(){
    set_game();//sets the initial state of game
    
    while (lives_left > 0 && guessed_word.includes("_")) {
        const guess = prompt("Enter a single letter: ").toLowerCase();
        
        //checks if the input from user is single letter and an alphabet
        if (guess.length !== 1 || !/^[A-Z, a-z]$/.test(guess)) {
            console.log("Invalid input. You have to enter a single alphabet.");
            continue;
        }

        //checks if the user entered the already guessed letter 
        if (guessed_letters.includes(guess)) {
            console.log("You hvae already guessed ", guess);
            continue;
        }

        check_guess(guess);
    }
}

