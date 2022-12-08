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

	let i = 0;

	const reg = /(^$\scd\s[a-z])/;
	const fileSystem = {};

	let src = '';
	let dirs = {};
	let size = 0;
	let rootSize = 0;
	let dir = '';
	while (i < data.length) {
		const instruction = data[i];

		if (instruction.startsWith('$ ls')) {
			size = 0;
		} else if (instruction.startsWith('$ cd') && data[i + 1] === '$ ls') {
			dir = instruction.replace('$ cd ', '');
			if (dir !== '/') {
				src += dir + '/';
			} else {
				src = '/';
			}
		} else if (instruction === '$ cd ..') {
			if (src.startsWith('/' + dir)) {
				src = '';
			} else {
				src = src.slice(0, src.indexOf('/' + dir));
			}
		} else if (
			!instruction.startsWith('dir') &&
			!instruction.startsWith('$')
		) {
			const parentDir = src.slice(0, src.indexOf('/' + dir)) + '/';
			const fileSize = parseInt(instruction.split(' ')[0]);
			rootSize += fileSize;
			size += fileSize;
			// console.log(`src: ${src} size: ${size} parentDir: ${parentDir}`);
			if (src !== '') {
				dirs = {
					...dirs,
					[src]: size,
					[parentDir]: parseInt(dirs[parentDir]) + size,
				};
			}
		}
		dirs = { ...dirs, '/': rootSize };
		i++;
	}

	let totalSize = 0;
	for (const dirSize in dirs) {
		// console.log('dir', dirSize, dirs[dirSize]);
		if (dirs[dirSize] < 100000) {
			totalSize += dirs[dirSize];
		}
	}

	return totalSize;
};

module.exports = { partOne };
