// bring in the required js file to access the export
// var word = require('./Word.js');

// bring in the required js file to access the export
var game = require('./Game.js');

// Dependency for inquirer npm package
var inquirer = require("inquirer");

// Load the fs package to read 
var fs = require('fs');

// create a new game variable to be populated with each new game
var newGame;

// define variables for the inquirer questions to be asked
var startQuestion = [{
    name: "start",
    message: "Would you like to play a New Game?",
    type: "confirm"
    }];

var levelQuestion = [{
    name: "level",
    message: "What Level would you like to try?",
    type: "list",
    choices: ["Easy", "Harder", "Hardest"]
}];


function nextAction(answers){

    if (answers.start) {
        startGame();
    } else {
        endGame();
    }

};

function startGame() {
    
    inquirer.prompt(levelQuestion).then(buildGame);
    
};

function endGame() {
    
    console.log("\n--------\nendGame()\n---------");
    console.log("Come back again soon!");

    // Exit the game
    process.exit();

};

function buildGame(answers){

    switch(answers.level) {
        case "Easy":
            console.log("Easy was chosen.");
            newGame = new game("hangman");
            
            break;
        case "Harder":
            console.log("Harder was chosen.");
            newGame = new game("hangman");
            break;
        case "Hardest":
            console.log("Hardest was chosen.");
            newGame = new game("hangman");
            break;
  
    };

    newGame.initializeNewGame();

    playGame();
 
};

function playGame()  {

    inquirer
        .prompt([
            {
                name: "letter",
                message: "Guess a letter: ",
                validate: function(value) {
                    
                    if (newGame.guessLetters.indexOf(value) === -1) {
            
                        return true;
            
                    } else {
            
                        return false;
            
                    }

                }
            }
        ])
        .then( function(check) {

            newGame.isGuessCorrect(check.letter);
            if (newGame.checkDecision() === "none") {
                playGame();
            } else {
                playAgain();   
            }

        });

};

function playAgain() {
    inquirer.prompt(startQuestion).then(nextAction);
};

playAgain();
