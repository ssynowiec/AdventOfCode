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

	let count = 0;
	for (let i = 0; i < data.length; i++) {
		const x = data[i];

		if (i === 0 || i === data.length - 1) {
			count += x.length;
			continue;
		}
		for (let j = 0; j < x.length; j++) {
			if (j === 0 || j === x.length - 1) {
				count++;
				continue;
			}
			const tree = x[j];
			const bottomv = () => {
				for (let k = i + 1; k < data.length; k++) {
					const bottom = data[k][j];
					if (tree <= bottom) {
						return false;
					}
				}
				return true;
			};

			const topv = () => {
				for (let l = i - 1; l >= 0; l--) {
					const top = data[l][j];
					if (tree <= top) {
						return false;
					}
				}
				return true;
			};

			const rightv = () => {
				for (let l = 1; j + l <= x.length - 1; l++) {
					const right = x[j + l];
					if (tree <= right) {
						return false;
					}
				}
				return true;
			};

			const leftv = () => {
				for (let k = j - 1; k >= 0; k--) {
					const left = x[k];
					if (tree <= left) {
						return false;
					}
				}
				return true;
			};

			if (topv() || leftv() || rightv() || bottomv()) {
				count++;
			}
		}
	}

	return count;
};

module.exports = { partOne };
