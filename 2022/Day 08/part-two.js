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

	let max = 0;
	let count = 0;
	for (let i = 0; i < data.length; i++) {
		const x = data[i];

		for (let j = 0; j < x.length; j++) {
			const tree = x[j];
			const bottomv = () => {
				let seensTrees = 0;
				for (let k = i + 1; k < data.length; k++) {
					const bottom = data[k][j];

					if (tree > bottom) {
						seensTrees++;
					} else if (tree === bottom) {
						seensTrees++;
						break;
					} else {
						seensTrees++;
						break;
					}
					// break;
				}
				return seensTrees;
			};

			const topv = () => {
				let seensTrees = 0;
				for (let l = i - 1; l >= 0; l--) {
					const top = data[l][j];
					if (tree > top) {
						seensTrees++;
					} else if (tree === top) {
						seensTrees++;
						break;
					} else {
						seensTrees++;
						break;
					}
					// break;
				}
				return seensTrees;
			};

			const rightv = () => {
				let seensTrees = 0;
				for (let l = 1; j + l <= x.length - 1; l++) {
					const right = x[j + l];
					if (tree > right) {
						seensTrees++;
					} else if (tree === right) {
						seensTrees++;
						break;
					} else {
						seensTrees++;
						break;
					}
					// break;
				}
				return seensTrees;
			};

			const leftv = () => {
				let seensTrees = 0;
				for (let k = j - 1; k >= 0; k--) {
					const left = x[k];
					if (tree > left) {
						seensTrees++;
					} else if (tree === left) {
						seensTrees++;
						break;
					} else {
						seensTrees++;
						break;
					}
					// break;
				}
				return seensTrees;
			};

			const result = topv() * leftv() * rightv() * bottomv();

			max = Math.max(max, result);
		}
	}

	return max;
};

module.exports = { partTwo };
