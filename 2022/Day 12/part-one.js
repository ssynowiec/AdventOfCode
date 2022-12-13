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

	let startPostiton = [0, 0];
	let endPostion = [0, 0];
	let currentPostion = [0, 0];
	let height = '`'.charCodeAt(0);
	for (let i = 0; i < data.length; i++) {
		for (let c = 0; c < data[i].length; c++) {
			if (data[i].charCodeAt(c) === 'S'.charCodeAt(0)) {
				startPostiton = [i, data[i].indexOf('S')];
				data[i] = data[i].replace('S', '`');
				currentPostion = startPostiton;
			}
			if (data[i].charCodeAt(c) === 'E'.charCodeAt(0)) {
				endPostion = [i, data[i].indexOf('E')];
				data[i] = data[i].replace('E', '{');
			}
		}
	}

	const graph = [];
	data.forEach((row, i) => {
		console.log(row, i);
		graph[i] = [];
		for (let j = 0; j < row.length; j++) {
			graph[i][j] = {
				char: row[j].charCodeAt(0),
				visited: false,
			};
			if (
				currentPostion[0] - endPostion[0] > 0 &&
				graph[i + 1][j].char - graph[i][j] === 1
			) {
				// go down
			} else {
				// go right
			}
		}
	});

	return graph;
};

partOne('/test.data.txt').then(res => console.log(res));

module.exports = { partOne };
