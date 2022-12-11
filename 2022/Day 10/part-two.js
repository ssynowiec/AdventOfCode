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

	for (let i = 0; i < 240; i += 40) {
		let line = '🟥';
		let lineIndex = 0;
		for (let j = 0; j < 40; j++, lineIndex++) {
			const position = cycles[i + j];
			if (
				[position - 1, position, position + 1].includes(lineIndex + 1)
			) {
				line += '🟥';
			} else {
				line += '⬛';
			}
		}
		console.log(line);
	}
};

partTwo('/data.txt');

module.exports = { partTwo };
