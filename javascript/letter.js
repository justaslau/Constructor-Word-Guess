var Letter = function(letter) {
	this.letter = letter;
	this.guessed = false;
	this.addToArray = function() {
		if (this.guessed) {
			return (this.letter);
		} else {
			return ("_");
		}
	}
	this.isCorrect = function(userInputLetter) {
		if (this.letter === userInputLetter) {
			this.guessed = true;
		}
	}
}
module.exports = Letter;