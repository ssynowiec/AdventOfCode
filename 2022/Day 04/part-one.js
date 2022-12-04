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

	const pairs = [];
	data.forEach(element => {
		const pair = [];
		element.split(',').forEach(element => {
			pair.push(element.split('-'));
		});
		pairs.push(pair);
	});

	let count = 0;
	for (let i = 0; i < pairs.length; i++) {
		let elf1 = pairs[i][0];
		let elf2 = pairs[i][1];

		if (
			(parseInt(elf1[0]) <= parseInt(elf2[0]) &&
				parseInt(elf1[1]) >= parseInt(elf2[1])) ||
			(parseInt(elf2[0]) <= parseInt(elf1[0]) &&
				parseInt(elf2[1]) >= parseInt(elf1[1]))
		) {
			count++;
		}
	}

	return count;
};

partOne('/test.data.txt').then(res => console.log(res));

module.exports = { partOne };
