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