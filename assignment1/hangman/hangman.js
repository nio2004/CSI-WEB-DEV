// Storing the Words
const words = ["apple", "banana", "cherry", "orange", "lemon", "grape", "pineapple", "strawberry", "watermelon", "blueberry", "chocolate", "cookie", "pizza", "hamburger", "sandwich", "butterfly", "elephant", "giraffe", "lion", "tiger", "sunflower", "rainbow", "ocean", "mountain", "volcano"];
const it = Math.floor(Math.random()*words.length); // Random number for selection of Word using the number as index

//Variables
let guesses=[];
let counter=0;

let originalWord;
let maskedWord='';


function displayGuessedWord() {
    let displayedWord='';
    for(const letter of originalWord){
        if(guesses.includes(letter)){
            displayedWord+= letter +' ';
            }
        else{
            displayedWord += '_ ';
        }
    }
    console.log(displayedWord);
    let temp=displayedWord.split(' ');
    maskedWord=temp.join('');
}

function guessLetter(letter){
    if(!guesses.includes(letter)){
        guesses.push(letter);
    }
    console.log("Your Guesses")
    console.log(guesses);
}

function hangman(){
    switch(counter){
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

const isConsoleOpen = () => {
    const widthThreshold = 100; // Adjust this threshold as needed
    const heightThreshold = 100; // Adjust this threshold as needed
  
    const consoleWidth = window.outerWidth - window.innerWidth;
    const consoleHeight = window.outerHeight - window.innerHeight;
  
    return consoleWidth > widthThreshold || consoleHeight > heightThreshold;
  };

  function startGame(){    
    originalWord=words[it];
    
    let gameOn=true;
    if (isConsoleOpen()){
    while(gameOn){   
    displayGuessedWord();  
    
    if(maskedWord==originalWord){
        console.log("You Win!!")
        gameOn=false;
        break;
    }

    let input=prompt("Guess a Letter");
    guessLetter(input);

    if(!originalWord.includes(input)){
        counter++;
    }
          
    console.log ("Tries Left: "+(6-counter));
    
    hangman();
    
    if(counter>=6){
        console.log("Game Over");
        console.log("The Word was "+ originalWord)
        gameOn=false;
    }
    }
}
}

console.log("Welcome to Hangman");
startGame();