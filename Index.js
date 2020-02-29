// bring in the required js file to access the export
var word = require('./Word.js');

// Dependency for inquirer npm package
var inquirer = require("inquirer");

var wordsToGuess = ["hangman"];  // used for testing the functionality
// var wordsToGuess = ["robert", "marie", "frank", "debra", "raymond", "geoffrey", "michael", "ally", "amy", "shamsky",
// "barone", "macdougall", "stefania", "peter", "lois", "warren"];

var gameWord;

var remainingGuesses = 2;

// Function to run the game itself. 
function playGame() {
    console.log("\n--------\nplayGame()\n---------");

    var trying = wordsToGuess[0];

    gameWord = new word;
    
    gameWord.populateWordArray(trying);

    console.log(gameWord.showWord());

    playRound();

};

function playRound() {

    if (remainingGuesses > 0) {

        inquirer
            .prompt([
                {
                    name: "letter",
                    message: "Guess a letter: "
                }
            ])
            .then(function(guess) {

                gameWord.guessWord(guess.letter);

                remainingGuesses--;

                playRound();

            });
                

    } else {

        endGame();
    }

};

function endGame() {
    // whether it was a Win or Loss
    console.log("\n--------\nendGame()\n---------");

    // Prompts the user if they would like to play again. if yes, run playgame with a value of 0 being passed into it
    // Otherwise print the "come back again soon message" and exit
    inquirer
        .prompt({
            name: "again",
            type: "confirm",
            message: "Would you like to guess another word?"
            })
        .then(function(answer) {
            if (answer.again === true) {

                // update the remaining guesses
                remainingGuesses = 2;

                playGame();

            } else {

            console.log("Come back again soon!");
            }

        });
};

playGame();