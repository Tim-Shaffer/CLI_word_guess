// bring in the required js file to access the export
var letter = require('./Letter.js')

// create the WORD constructor 
function Word() {
    this.wordArray = [];
    this.showWord = function() {
        var outputString = "";

        for (let i=0; i < this.wordArray.length; i++) {
            outputString += this.wordArray[i].checkChar() + " ";
        }

        return outputString;
    };
    this.guessWord = function(char) {

        for (let i=0; i < this.wordArray.length; i++) {
            this.wordArray[i].checkGuess(char);
        }

    };
    // added this method to populate the word array with a provided string
    this.populateWordArray = function(string) {
        for (i=0; i < string.length; i++) {
            this.wordArray.push(new letter(string[i])); 
        }  
    }
};

// // Testing the word process first
// var word = new Word;
// // console.log(word);

// var trying = "robert";
// for (i=0; i < trying.length; i++) {
//     word.wordArray.push(new letter(trying[i]));   // this works to create a new array of letter objects!
// };

// word.guessWord("r"); // this works to process a guessed letter!

// console.log(word.showWord());  // this will show the word based on the letter being selected or not!

module.exports = Word;  // this works to export the Word constructor!

