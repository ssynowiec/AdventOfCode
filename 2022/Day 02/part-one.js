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

const partOne = async input => {
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

		switch (choice[1]) {
			case 'X':
				myChoice = 'Rock';
				roundPoints = 1;
				break;

			case 'Y':
				myChoice = 'Paper';
				roundPoints = 2;
				break;

			case 'Z':
				myChoice = 'Scissors';
				roundPoints = 3;
				break;
		}

		let roundScore = 0;

		if (elfsChoice === myChoice) {
			roundScore = roundPoints + 3;
		} else if (elfsChoice === 'Rock' && myChoice === 'Paper') {
			roundScore = roundPoints + 6;
		} else if (elfsChoice === 'Rock' && myChoice === 'Scissors') {
			roundScore = roundPoints + 0;
		} else if (elfsChoice === 'Paper' && myChoice === 'Rock') {
			roundScore = roundPoints + 0;
		} else if (elfsChoice === 'Paper' && myChoice === 'Scissors') {
			roundScore = roundPoints + 6;
		} else if (elfsChoice === 'Scissors' && myChoice === 'Rock') {
			roundScore = roundPoints + 6;
		} else if (elfsChoice === 'Scissors' && myChoice === 'Paper') {
			roundScore = roundPoints + 0;
		}

		totalPoints += roundScore;
	});

	return totalPoints;
};

module.exports = { partOne };
