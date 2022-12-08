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
			// count += x.length;

			continue;
		}
		for (let j = 0; j < x.length; j++) {
			let isVisible = false;
			if (j === 0 || j === x.length - 1) {
				// count++;
				continue;
			}
			const tree = x[j];
			for (let k = i; i + k <= data.length - 1; k++) {
				const bottom = data[i + k][j];
				if (tree > bottom && !isVisible) {
					isVisible = true;
					count++;
					break;
				}
				if (bottom >= tree) {
					isVisible = false;
					break;
				}
			}
			for (let l = 1; j + l <= x.length - 1; l++) {
				const right = x[j + l];
				if (tree > right && !isVisible) {
					isVisible = true;
					count++;
					break;
				}
				if (right >= tree) {
					isVisible = false;
					break;
				}
			}

			for (let k = i - 1; k >= 0; k--) {
				const top = data[k][j];
				if (tree > top && !isVisible) {
					isVisible = true;
					count++;
					break;
				}
				if (top >= tree) {
					isVisible = false;
					break;
				}
			}
			for (let l = j - 1; l >= 0; l--) {
				const left = x[l];
				if (tree > left && !isVisible) {
					isVisible = true;
					count++;
					break;
				}
				if (left >= tree) {
					isVisible = false;
					break;
				}
			}
			if (
				`${i}${j}` === '31' ||
				`${i}${j}` === '32' ||
				`${i}${j}` === '33'
			) {
				console.log(count);
			}
			console.log(`${i},${j} (${data[i][j]}): ${count}`);
		}
	}

	return count;
};

partOne('/test.data.txt').then(console.log);

module.exports = { partOne };
