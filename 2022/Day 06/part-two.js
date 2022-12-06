const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

const asyncReadFile = async filename => {
	try {
		const contents = await fsPromises.readFile(
			dirname(__filename) + filename,
			'utf-8',
		);

		const arr = contents.split(/\r?\n/);

		return contents;
	} catch (err) {
		console.log(err);
	}
};

const partTwo = async input => {
	const data = await asyncReadFile(input);

	let index = 0;
	for (let i = 0; i < data.length - 3; i++) {
		const endIndex = i + 14;
		const substring = data.slice(i, endIndex).split('');
		let unik = '';
		substring.forEach(char => {
			if (!unik.includes(char)) {
				unik += char;
			}
		});
		if (unik.length === 14) {
			index = i + 14;
			break;
		}
	}

	return index;
};

module.exports = { partTwo };
