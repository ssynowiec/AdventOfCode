const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

const asyncReadFile = async filename => {
	try {
		const contents = await fsPromises.readFile(
			dirname(__filename) + filename,
			'utf-8',
		);

		const arr = contents.split(/\r?\n/);

		return arr;
	} catch (err) {
		console.log(err);
	}
};

const partTwo = async input => {
	const data = await asyncReadFile(input);

	let totalPoints = 0;

	data.forEach(string => {
		const choice = string.split(' ');

		let elfsChoice;

		switch (choice[0]) {
			case 'A':
				elfsChoice = 'Rock';
				break;

			case 'B':
				elfsChoice = 'Paper';
				break;

			case 'C':
				elfsChoice = 'Scissors';
				break;
		}

		let myChoice;
		let roundPoints = 0;
		let roundScore = 0;

		if (elfsChoice === 'Rock' && choice[1] === 'X') {
			roundPoints = 0;
			myChoice = 'Scissors';
			roundScore = 3 + roundPoints;
		} else if (elfsChoice === 'Rock' && choice[1] === 'Y') {
			roundPoints = 3;
			myChoice = 'Rock';
			roundScore = 1 + roundPoints;
		} else if (elfsChoice === 'Rock' && choice[1] === 'Z') {
			roundPoints = 6;
			myChoice = 'Paper';
			roundScore = 2 + roundPoints;
		} else if (elfsChoice === 'Paper' && choice[1] === 'X') {
			roundPoints = 0;
			myChoice = 'Rock';
			roundScore = 1 + roundPoints;
		} else if (elfsChoice === 'Paper' && choice[1] === 'Y') {
			roundPoints = 3;
			myChoice = 'Paper';
			roundScore = 2 + roundPoints;
		} else if (elfsChoice === 'Paper' && choice[1] === 'Z') {
			roundPoints = 6;
			myChoice = 'Scissors';
			roundScore = 3 + roundPoints;
		} else if (elfsChoice === 'Scissors' && choice[1] === 'X') {
			roundPoints = 0;
			myChoice = 'Paper';
			roundScore = 2 + roundPoints;
		} else if (elfsChoice === 'Scissors' && choice[1] === 'Y') {
			roundPoints = 3;
			myChoice = 'Scissors';
			roundScore = 3 + roundPoints;
		} else if (elfsChoice === 'Scissors' && choice[1] === 'Z') {
			roundPoints = 6;
			myChoice = 'Rock';
			roundScore = 1 + roundPoints;
		}

		totalPoints += roundScore;
	});

	return totalPoints;
};

module.exports = { partTwo };
