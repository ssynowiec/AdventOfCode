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
	let i = 1;
	const data = await asyncReadFile(input);

	const instructions = [];
	data.forEach(line => {
		const instruction = line.split(' ');
		if (instruction[0] === 'addx') {
			instructions.push([instruction[0], instruction[1]]);
			instructions.push(['noop']);
		} else {
			instructions.push([instruction[0]]);
		}
	});

	const cycles = [];
	let cycle = 0;
	instructions.forEach((instruction, index) => {
		if (instruction[0] === 'addx') {
			cycles[cycle] = i;
			i += parseInt(instruction[1]);
			cycles[cycle + 1] = i;
		} else {
			cycles[cycle] = i;
		}
		cycle++;
	});

	let sumSignalStrength = 0;
	for (let i = 19; i <= 220; i += 40) {
		let signalStrength = 0;
		signalStrength += cycles[i - 1] * (i + 1);
		sumSignalStrength += signalStrength;
	}

	return sumSignalStrength;
};

module.exports = { partOne };
