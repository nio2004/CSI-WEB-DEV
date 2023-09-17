//initial instructions
console.log("Welcome to the JS Hangman Game. This is a part of my Assignment 1.\n1. You will be given a word to guess. \n2. The word will be the name of an Indian city. \n3. All the letters are CAPITAL and the game is case sensitive. \n4. You need not guess two times for a repeated letter in the word. \n5. You get five lives. Each time you guess a letter wrong, your life will decrement by one. \n6. Enter your guesses in your browser's prompt window.");

//word array to choose from. kept every letter capital to increase visibility.
let word_list = [ "CHENNAI", "DELHI", "MUMBAI", "PUNE", 
"KOLKATA", "AHMEDABAD", "CHANDIGARH", "LUCKNOW", "SHIMLA",
"HYDERABAD", "BENGALURU", "VISHAKHAPATTANAM"
]

var lives = 5; // 5 lives for each player
var flag = 0; // this is used later in the while loop
let guessedletters = ""; // this will be concatenated to the input

//generate a random word from the array
function random_word_generator(){
    var i = Math.floor(Math.random() * word_list.length);
    var word = word_list[i];
    return word
}

//generate initial underscores for the player, based on the random word from the array
function generate_underscores(word){
    u = "_ ";
    a = "";
    for(i = 0; i < word.length; i++){
        a = a + u;
    }

    return a;
}

// replace underscores with the guessed letter, if guessed letter is in the word to be guessed
function update_underscores(word, guessedletters){
    var u = "_ ";
    let a = "";
    for(i = 0; i < word.length; i++){
        if (guessedletters.includes(word[i])){
            a = a + word[i];
        }
        else{
            a = a + u;
        }
    }

    return(a);
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

word2 = random_word_generator();
console.log("Let's begin. Lives left:", lives);
guessed_word = generate_underscores(word2);
console.log(guessed_word)

// checks if all the underscores are replaced by the guessed word and return boolean accordingly
function checkifWon(guessed_word){
    for(i = 0; i < word2.length; i++){
        if(!guessed_word.includes("_ ")){
            return true;
        }
    }
    return false;
}

while (flag == 0) {
    try {
        var input = prompt("Guess letter: ");
        
        // validate that the input is a single letter (A-Z or a-z)
        if (/^[A-Za-z]$/.test(input)) {
            guessedletters += input;
            if(word2.includes(input)){
                guessed_word = update_underscores(word2, guessedletters);
                console.log(guessed_word, "Lives left: ", lives);
                if(checkifWon(guessed_word)){
                    console.log("Congratulations! You've won. The word was:", word2);
                    flag = 1;
                }
            }
            //exit the while loop
            else if(lives == 0){
                console.log("All lives exhausted. Game over. The word was ", word2);
                hangman_bana(lives);
                flag = 1;
            }
            //guessed letter is wrong; decrement lives by 1
            else{
                lives--;
                console.log(guessed_word, "Lives left: ", lives);
                hangman_bana(lives);
            }
        } else {
            // throw an error if the input is not a single letter
            throw new Error("Invalid input. Please enter a single CAPITAL letter (A-Z).");
        }} catch (error) {
            // Handle the error and alert the user
            alert(error.message);
        }
    }