var Letter = require('./letter');
var Word = function(randomWord) {
	this.timeToGuess = 10;
	this.word = randomWord;
	this.letters = [];
	this.splitToLetters = function() {
		var tempArray = this.word.split("");
		for (var i = 0; i < tempArray.length; i++) {
			this.letters.push(new Letter(tempArray[i]));
		}
	}
	this.checkLetter = function(userInputLetter) {
		for (var i = 0; i < this.letters.length; i++) {
			this.letters[i].isCorrect(userInputLetter);
		}
		value = this.printToScreen(userInputLetter);
		return value;
	}
	this.printToScreen = function(userInputLetter) {
		var generatedArray = [];
		var isAnswered = false;
		var newLine = "\n";
		for (var i = 0; i < this.letters.length; i++) {
			generatedArray.push(this.letters[i].addToArray());
		}
		generatedArray = generatedArray.join(" ");
		if (userInputLetter) {
			if (generatedArray.indexOf(userInputLetter) > -1) {
				console.log("\n" + "CORRECT !!!");
			} else {
				this.timeToGuess--;
				console.log("\n" + "NOT CORRECT !!! " + "Times to guess left: " + this.timeToGuess);
			}
		}
		console.log(newLine + generatedArray + newLine);
		for (var i = 0; i < this.letters.length; i++) {
			if (this.letters[i].guessed === true) {
				isAnswered = true;
			} else {
				isAnswered = false;
				break;
			}
		}
		return isAnswered;
	}
	this.splitToLetters();
	this.printToScreen();
}
module.exports = Word;