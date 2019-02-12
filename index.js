var inquirer = require('inquirer');
var fs = require("fs");
var Word = require('./javascript/word');
var guessedLetters = [];
var wordsArray = [];

function selectRandomWord() {
	var randomNumber = Math.floor((Math.random() * wordsArray.length));
	selectedWord = wordsArray[randomNumber];
	gameWord = new Word(selectedWord);
	guessedLetters = [];
	timesToGuess = 10;
	getLetters();
}

function getLetters() {
	var question = [{
		type: 'input',
		name: 'guess',
		message: "Guess letter! :)",
		validate: function(value) {
			var pass = value.match(/^[a-zA-Z]*$/);
			if (pass) {
				return true;
			}
			return 'Only letters accepted';
		}
	}];
	inquirer.prompt(question).then(answers => {
		if (gameWord.timeToGuess > 1) {
			if (guessedLetters.indexOf(answers.guess) === -1) {
				guessedLetters.push(answers.guess);
				value = gameWord.checkLetter(answers.guess);
				if (value === false) {
					getLetters();
				} else {
					console.log("\n" + "You Won! Selecting new word..." + "\n");
					selectRandomWord();
				}
			} else {
				console.log("\n" + "You already guessed this letter." + "\n");
				getLetters();
			}
		} else {
			console.log("\n" + "You Lost! Selecting new word..." + "\n");
			selectRandomWord();
		}
	});
}

function readWordsFile(fileName) {
	fs.readFile(fileName, "utf8", function(error, data) {
		if (error) {
			return console.log("Error: " + error);
		}
		wordsArray = data.split(", ");
		selectRandomWord();
	});
}
readWordsFile("social.txt");