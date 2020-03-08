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
    // --------------------------------------------------------------------------------------
    // added this method to populate the word array with a provided string
    // --------------------------------------------------------------------------------------
    this.populateWordArray = function(string) {
        for (i=0; i < string.length; i++) {
            this.wordArray.push(new letter(string[i])); 
        } 
    };
    // --------------------------------------------------------------------------------------
    // end of populateWordArray method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // added method to mark all letters as guessed so that the losing word can be displayed
    // --------------------------------------------------------------------------------------
    this.showWordOnLoss = function() {
        for (let i=0; i < this.wordArray.length; i++) {
            this.wordArray[i].letterGuessed = true;
        }
    }
    // --------------------------------------------------------------------------------------
    // end of showWordOnLoss method
    // --------------------------------------------------------------------------------------
};

module.exports = Word;  // this works to export the Word constructor!