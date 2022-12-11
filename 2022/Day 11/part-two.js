const { promises: fsPromises } = require('fs');
const { dirname } = require('path');

const asyncReadFile = async(filename) => {
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
}

const partTwo = async input => {
	const data = await asyncReadFile(input);

	return result
};

module.exports = { partTwo };
