# CLI_word_guess
A Command Line Interface Word Guess game

# Author 
> Tim Shaffer

## Tech Used

* JavaScript
    * Constructors
    * Objects
    * Recursion
    * Math.random

* node.js
    * inquirer
    * fs

## Command Line Interface (CLI) 
* tasked with creating a CLI that would use at least 3 files
    * file for the Letter constructor
    * file for the Word constructor
    * file for the main processing control
* randomly pick a word from an array and present it to the user with '_' to hold the positions of the letters in the word
* user input of a letter will reveal a letter when guessed correctly
* allow for a maximum number of guesses per word before the game is lost
* start the process over again with a new word after a win or loss

## Prompts - user-input

* Yes or No confirmation on whether or not to play the game
    * Yes - continue
    * No - end the game

* Choose from a list of possible themes for the words to be guessed 
    * determines which file to read to get the list of words to then randomly select which one to play

* Guess a letter
    * only one letter at a time
    * letter can only be guessed once
    * case insensitive
    * must be a letter  

# Getting started

*   Fork the the repository into your own space on GitHub
*   Clone your forked repository into your own workspace.
*   Within the terminal and the folder containing the repository, you must install the required node package dependencies defined in the **package.json** file into your folder.  Trigger the package install  

>
> npm i 
> 

# Instuctions 
1.  Trigger node to run the program 

>
> node index
>

2.  Answer with a 'Y' or 'N' if you want to play the game
1.  Select from the list of themes
1.  Guess a letter until there are no more guesses allowed or you have correctly guessed all the possible letters
1.  Restart from step 2

## Programming Organization

*   Part of the task of this application was to showcase the use of constructor processing.  The main functionality of the process is broken into separate JavaScript constructors whose object methods are then called to complete the game process.

* Letter.js constructor file - The constructor is able to display an underlying character or an underscore placeholder depending on whether or not the user has guessed the letter.

        // Letter constructor
        function Letter(stringVal) {
            this.stringVal = stringVal;
            this.letterGuessed = false;
            this.checkChar = function () {
                
                if (this.letterGuessed) {
                    return this.stringVal;
                } else {
                    if (this.stringVal === " ") {
                        return " ";
                    } else {
                        return "_";
                    }
                }

            };
            this.checkGuess = function (char) {
                
                if (char === this.stringVal.toLowerCase()) {
                    this.letterGuessed = true;
                } 
            };

        };

        module.exports = Letter;

* Word.js constructor file - The constructor depends on the Letter constructor. It is used to create an object representing the current word the user is attempting to guess and methods needed to populate the word to guess, show the word, guess the word, and show the word on a loss.

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

        module.exports = Word; 

* Game.js constructor file - The constructor depends on the Word constructor. It is used to create an object representing the current game being played. It maintains the current word being guessed, how many letters need to be guessed correctly to solve, the allotted number of incorrect guesses, and whether the game is still active or has a won/loss decision been made.  Methods are attached to process any necessary part of the actual game flow.

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
                unique.push(str[0].toLowerCase());
                // loop through the rest of the string
                for (i=1; i < str.length; i++) {
                    // see if there is a match already in the unique array
                    if (unique.indexOf(str[i].toLowerCase()) === -1 && str[i] !== " ") {
                        unique.push(str[i].toLowerCase());	
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

                console.log(this.newWord.showWord()); 

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
            // method to check if a game decision needs to be made or not
            // --------------------------------------------------------------------------------------
            this.checkDecision = function() {
                
                // if the number of letters correctly found === correctLettersNeeded (WINNER!!!)
                if (this.correctLettersNeeded === this.lettersFound) {
                    
                    console.log("\nCongratulations.  You Won!!!\n")
                    this.decision = "win";

                } else 
                
                // when this wrong guess takes the reamining guesses allowed to 0  (LOSS)
                if (this.remainingGuesses === 0) {

                    console.log("\nToo bad.  You Lost.\n")
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

                // letter = letter.toLowerCase();

                // Search the guess word to see if character is found
                if (this.answer.indexOf(letter) != -1 || this.answer.indexOf(letter.toUpperCase()) != -1){

                    // match was found - increment the lettersFound variable
                    this.lettersFound++;

                    console.log("\n CORRECT GUESS\n");

                    this.newWord.guessWord(letter); // this works to process a guessed letter!

                }

                else {

                    // Calculate the number of remaining guesses allowed as the difference between the max and the wrong guesses
                    this.remainingGuesses--;

                    console.log("\n INCORRECT GUESS");
                    console.log("Remaining Guesses:  " + this.remainingGuesses + "\n");

                };

                this.updateGuessLetters(letter);
                
                console.log(this.newWord.showWord()); 

            };
            // --------------------------------------------------------------------------------------
            // end of isGuessCorrect method
            // --------------------------------------------------------------------------------------    

            // --------------------------------------------------------------------------------------
            // method to show the word when a loss was processed
            // --------------------------------------------------------------------------------------
            this.losingWord = function() {
                this.newWord.showWordOnLoss();
                console.log(this.newWord.showWord());
            };
            // --------------------------------------------------------------------------------------
            // end of losingWord method
            // --------------------------------------------------------------------------------------

        };

        module.exports = Game;

* index.js - This is the main processing control which requires the node.js 'inquirer' package to interract with the user. Prompts are provided to the user and then functions are called based on the inputs and where the game stands in it's flow.

    * Functions:

        *   `playAgain()` - provide the prompt to the user to play the game or not
        *   `nextAction()` - start a game or end the application
        *   `startGame()` - provide the prompt for the user to select the theme
        *   `endGame()` - end the application process and return to the command line
        *   `buildGame()` - determine the theme based file to use to get the words to be guessed
        *   `selectWord()` - read the corresponding theme file and randomly select which word from the file is to be guessed.  Creates a newGame object and calls to method to `initializeNewGame()`
        *   `playGame()` - provide the prompt for the user to enter the letter to guess
        *   `processLetter()` - take the new letter that was guessed and call the game method to `checkDecision()`.  Continues to call `playGame()` while there are still guesses allowed or needed.  If the game has been lost, the game method `losingWord()` is called to show the word that the user was trying to guess before calling the `playAgain()` function to see if the user wants to continue playing.

    * Theme files - files were created to hold movie titles based on the particular themes.

        *   `2000.txt` - titles of movies from the 2000's
        *   `2010.txt` - titles of movies from the 2010's
        *   `remakes.txt` - titles of movies that have been remade 

# Examples

1.  *node index*

    ![Screenshot for starting the app](/screenshots/index.jpg)

1.  *Would you like to play a New Game?*
    
    ![Screenshot for Would you like to play a New Game?](/screenshots/new_game.jpg)

1.  *What Theme would you like to try?*

    ![Screenshot for What Theme would you like to try?](/screenshots/theme.jpg)

1.  *Guess a letter: *

    ![Screenshot for Guess a letter:](/screenshots/guess_letter.jpg)

1.  *CORRECT GUESS*

    ![Screenshot for Correct Guess](/screenshots/correct_guess.jpg)

1.  *INCORRECT GUESS*

    ![Screenshot for Incorrect Guess](/screenshots/incorrect_guess.jpg)

1.  *Congratulations.  You Won!!!*

    ![Screenshot for a winning game](/screenshots/winner.jpg)

1.  *Too bad.  You Lost.*

    ![Screenshot for a losing game](/screenshots/loser.jpg)

1.  *End Game*

    ![Screenshot for ending the game](/screenshots/end_game.jpg)


1. Video of the working app can be found here: https://youtu.be/R86RKsGpOoc

