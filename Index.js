// bring in the required js file to access the export
var game = require('./Game.js');

// Dependency for inquirer npm package
var inquirer = require("inquirer");

// Load the fs package to read 
var fs = require('fs');

// create a new game variable to be populated with each new game
var newGame;

//
var wordToGuess;

// create variables to hold the different filenames that hold the search words
var easyFile = 'easy.txt';
var harderFile = 'harder.txt';
var hardestFile = 'hardest.txt';

// define variables for the inquirer questions to be asked
var startQuestion = [{
    name: "start",
    message: "Would you like to play a New Game?",
    type: "confirm"
    }];

var levelQuestion = [{
    name: "level",
    message: "What Level would you like to try?",
    type: "rawlist",
    choices: ["Easy", "Harder", "Hardest"]
}];

var getLetter = [{
    name: "letter",
    message: "Guess a letter: ",
    validate: function(value) {
        if (value !== "" && value.length === 1 && 
                (value >= 'a' && value <= 'z')) {
            if (newGame.guessLetters.indexOf(value) === -1) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}];

// --------------------------------------------------------------------------------------
//  function to act on the user prompt as to whether they want to play a game or not 
// --------------------------------------------------------------------------------------
function nextAction(answers){

    if (answers.start) { 
        startGame();
    } else {
        endGame();
    }

};
// --------------------------------------------------------------------------------------
// end of nextAction() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to start a game and prompt the user for the type of game
// --------------------------------------------------------------------------------------
function startGame() {
    
    inquirer.prompt(levelQuestion).then(buildGame);
    
};
// --------------------------------------------------------------------------------------
// end of startGame() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to end the game
// --------------------------------------------------------------------------------------
function endGame() {
    
    console.log("\n--------\nendGame()\n---------");
    console.log("Come back again soon!");

    // Exit the game
    process.exit();

};
// --------------------------------------------------------------------------------------
// end of endGame() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to build the game based on the selection made by the user
// -------------------------------------------------------------------------------------
function buildGame(answers){

    switch(answers.level) {
        case "Easy":
            console.log("Easy was chosen.");
            selectWord(easyFile);
            break;
        case "Harder":
            console.log("Harder was chosen.");
            selectWord(harderFile);
            break;
        case "Hardest":
            console.log("Hardest was chosen.");
            selectWord(hardestFile);
            break;
  
    };
 
};
// --------------------------------------------------------------------------------------
// end of buildGame() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to control game play 
// --------------------------------------------------------------------------------------
function playGame()  {

    console.log("\n");

    inquirer.prompt(getLetter).then(processLetter);

};
// --------------------------------------------------------------------------------------
// end of playGame() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to process the letter that was guessed
// --------------------------------------------------------------------------------------
function processLetter(check) {
    
    newGame.isGuessCorrect(check.letter);
    if (newGame.checkDecision() === "none") {
        playGame();
    } else {
        playAgain();   
    }
};
// --------------------------------------------------------------------------------------
// end of processLetter() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
//  function to start the game play process and give the user the option to play or not
// --------------------------------------------------------------------------------------
function playAgain() {

    inquirer.prompt(startQuestion).then(nextAction);

};
// --------------------------------------------------------------------------------------
// end of playAgain() function
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------
// function to randomly select the word to guess from a provided input file
// --------------------------------------------------------------------------------------
function selectWord(fileName) {

    // read the random file and store the contents in "data"
    fs.readFile(fileName, "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
    
          return console.log("Error reading " + fileName + ".  Error = " + error);
    
        }

        // Then split it by commas (to make it more readable)  - separates values at the comma
        var dataArr = data.split(",");

        wordToGuess = dataArr[Math.floor(Math.random() * dataArr.length)].toLowerCase();

        newGame = new game(wordToGuess);

        newGame.initializeNewGame();

        playGame();
  
  });

};
// --------------------------------------------------------------------------------------
// end of selectWord() function
// --------------------------------------------------------------------------------------

// initial start of the game!
playAgain();
