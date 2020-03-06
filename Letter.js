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

module.exports = Letter;  // this works to export the Letter constructor!

// // Testing the letter process first
// var word = "robert";
// var wordArray = [];

// for (i=0; i < word.length; i++) {
//     wordArray.push(new Letter(word[i]));   // this works to create a new array of letter objects!
// };

// // console.log(wordArray);

// for (i=0; i < wordArray.length; i++) {
//     wordArray[i].checkGuess("r"); 
// };   // this works to check each letter in the array to whether it was guessed or not!

// // console.log(wordArray);

// var showWord = "";
// for (i=0; i < wordArray.length; i++) {
//     showWord += wordArray[i].checkChar() + " ";
// }; // this works to show each letter in the array to whether it was guessed or not!

// // console.log(showWord);