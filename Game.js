// bring in the required js file to access the export
var word = require('./Word.js');

// --------------------------------------------------------------------------------------
// create a game object
// --------------------------------------------------------------------------------------
function Game(answer) {
    this.answer = answer;
    this.newWord;
    this.guessLetters = [];
    this.correctLettersNeeded = 0;
    this.remainingGuesses = 8;
    this.lettersFound = 0;
    this.decision = "none";

    // --------------------------------------------------------------------------------------
    // method to calculate the number of unique letters in the word for the number of correct guesses needed to win
    // --------------------------------------------------------------------------------------
    this.getWinningNumber = function(str) {
        // create a new array from the string but only when the letter is unique
        var unique = [];
        // the first letter always needs to be counted at least once
        unique.push(str[0]);
        // loop through the rest of the string
        for (i=1; i < str.length; i++) {
            // see if there is a match already in the unique array
            if (unique.indexOf(str[i]) === -1) {
                unique.push(str[i]);	
            }
        }
        
        return unique.length;

    };
    // --------------------------------------------------------------------------------------
    // end of getWinningNumber method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to populate the word object to be guessed 
    // --------------------------------------------------------------------------------------
    this.initializeNewGame = function() {

        this.newWord = new word;

        this.newWord.populateWordArray(this.answer);

        // populate the variable to be used to see how many letters are in the word 
        this.correctLettersNeeded = this.getWinningNumber(this.answer);

        this.startNewGame = false;  
        
        this.inGame = true;

    };
    // --------------------------------------------------------------------------------------
    // end of initializeNewGame method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to update the array with the letters that were already guessed
    // --------------------------------------------------------------------------------------
    this.updateGuessLetters = function(letter) {
        this.guessLetters.push(letter);
    };
    // --------------------------------------------------------------------------------------
    // end of updateGuessLetters method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to take the letter entered and check if it was already guessed or not
    // --------------------------------------------------------------------------------------
    this.hasLetterBeenGuessed = function(chr) {

        // check to see if the letter was already guessed
        if (this.guessLetters.indexOf(chr) === -1) {
            
            return false;

        } else {

            return true;

        }

    }; 
    // --------------------------------------------------------------------------------------
    // end of hasLetterBeenGuessed method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to check if a game decision needs to be made or not
    // --------------------------------------------------------------------------------------
    this.checkDecision = function() {
        
        // if the number of letters correctly found === correctLettersNeeded (WINNER!!!)
        if (this.correctLettersNeeded === this.lettersFound) {
            
            console.log("Congratulations.  You Won!!!")
            this.decision = "win";

        } else 
        
        // when this wrong guess takes the reamining guesses allowed to 0  (LOSS)
        if (this.remainingGuesses === 0) {

            console.log("Too bad.  You Lost.")
            this.decision = "loss";      

        };

        return this.decision;

    };
    // --------------------------------------------------------------------------------------
    // end of checkDecision method
    // --------------------------------------------------------------------------------------

    // --------------------------------------------------------------------------------------
    // method to see if the current guess is part of the word or not
    // --------------------------------------------------------------------------------------
    this.isGuessCorrect = function(letter) {

        // Search the guess word to see if character is found
        if (this.answer.indexOf(letter) != -1){

            // match was found - increment the lettersFound variable
            this.lettersFound++;

            console.log("\n CORRECT GUESS");

            this.newWord.guessWord(letter); // this works to process a guessed letter!

        }

        else {

            // Calculate the number of remaining guesses allowed as the difference between the max and the wrong guesses
            this.remainingGuesses--;

            console.log("\n INCORRECT GUESS");

        };

        this.updateGuessLetters(letter);
        
        console.log(this.newWord.showWord()); 

    };
    // --------------------------------------------------------------------------------------
    // end of isGuessCorrect method
    // --------------------------------------------------------------------------------------    

};

module.exports = Game;  // this works to export the Game constructor!