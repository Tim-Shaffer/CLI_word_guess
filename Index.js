// bring in the required js file to access the export
var word = require('./Word.js');

// Dependency for inquirer npm package
var inquirer = require("inquirer");

var wordsToGuess = ["hangman"];  // used for testing the functionality
// var wordsToGuess = ["robert", "marie", "frank", "debra", "raymond", "geoffrey", "michael", "ally", "amy", "shamsky",
// "barone", "macdougall", "stefania", "peter", "lois", "warren"];

var trying = wordsToGuess[0];
var guessWord = new word;
guessWord.populateWordArray(trying);

console.log(guessWord.showWord());