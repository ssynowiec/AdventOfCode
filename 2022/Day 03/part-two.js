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

	const alphabet = [
		'a',
		'b',
		'c',
		'd',
		'e',
		'f',
		'g',
		'h',
		'i',
		'j',
		'k',
		'l',
		'm',
		'n',
		'o',
		'p',
		'q',
		'r',
		's',
		't',
		'u',
		'v',
		'w',
		'x',
		'y',
		'z',
		'A',
		'B',
		'C',
		'D',
		'E',
		'F',
		'G',
		'H',
		'I',
		'J',
		'K',
		'L',
		'M',
		'N',
		'O',
		'P',
		'Q',
		'R',
		'S',
		'T',
		'U',
		'V',
		'W',
		'X',
		'Y',
		'Z',
	];

	let sum = 0;

	for (let i = 0; i < data.length; i += 3) {
		const firstGroup = data[i];
		const secondGroup = data[i + 1];
		const thirdGroup = data[i + 2];

		for (let j = 0; j < firstGroup.length; j++) {
			if (
				secondGroup.includes(firstGroup[j]) &&
				thirdGroup.includes(firstGroup[j])
			) {
				sum += alphabet.indexOf(firstGroup[j]) + 1;
				break;
			}
		}
	}

	return sum;
};

module.exports = { partTwo };
