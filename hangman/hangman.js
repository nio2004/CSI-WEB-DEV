console.log("Welcome to the JS Hangman Game. This is a part of my Assignment 1.\n1. You will be given a word to guess. \n2. The word will be the name of an Indian city. \n3. All the letters are CAPITAL and the game is case sensitive. \n4. You need not guess two times for a repeated letter in the word. \n5. You get five lives. Each time you guess a letter wrong, your life will decrement by one. \n6. Enter your guesses in your browser's prompt window.");

let word_list = [ "CHENNAI", "DELHI", "MUMBAI", "PUNE", 
"KOLKATA", "AHMEDABAD", "CHANDIGARH", "LUCKNOW", "SHIMLA",
"HYDERABAD", "BENGALURU", "VISHAKHAPATTANAM"
]

var lives = 5;
var flag = 0;
let guessedletters = "";

function random_word_generator(){
    var i = Math.floor(Math.random() * word_list.length);
    var word = word_list[i];
    return word
}

function generate_underscores(word){
    u = "_ ";
    a = "";
    for(i = 0; i < word.length; i++){
        a = a + u;
    }

    return a;
}

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

word2 = random_word_generator();
console.log("Let's begin. Lives left:", lives);
guessed_word = generate_underscores(word2);
console.log(guessed_word)

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
        
        // Validate that the input is a single letter (A-Z or a-z)
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
            else if(lives == 0){
                console.log("All lives exhausted. Game over. The word was ", word2);
                flag = 1;
            }
            else{
                lives--;
                console.log(guessed_word, "Lives left: ", lives);
            }
        } else {
            // Throw an error if the input is not a single letter
            throw new Error("Invalid input. Please enter a single CAPITAL letter (A-Z).");
        }} catch (error) {
            // Handle the error and alert the user
            alert(error.message);
        }
    }