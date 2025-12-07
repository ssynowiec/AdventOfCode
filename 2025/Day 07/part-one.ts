import { readFile } from '@/helpers/read-file';

const findAllIndexs = (arr: string[], find: string) => {
	const indexs = [];

	let index = -1;
	while ((index = arr.indexOf(find, index + 1)) !== -1) {
		indexs.push(index);
	}

	return indexs;
};

export const partOne = (input: string): number => {
	const data = readFile(input).map(line => line.split(''));

	let result = 0;

	const startPosition = data[0].indexOf('S');

	const path: string[][] = [];
	data.forEach((line, i) => {
		if (i > 1) {
			const pathsPositons = findAllIndexs(path[i - 1], '|');

			if (line.includes('^')) {
				const splitterPositons = findAllIndexs(line, '^');

				const splittedPath = [];

				for (let i = 0; i < line.length; i++) {
					if (
						splitterPositons.includes(i) &&
						pathsPositons.includes(i)
					) {
						splittedPath[i - 1] = '|';
						splittedPath[i + 1] = '|';
						splittedPath[i] = line[i];
						i++;
						result++;
					} else {
						if (pathsPositons.includes(i)) {
							splittedPath[i] = '|';
						} else {
							splittedPath[i] = line[i];
						}
					}
				}
				path.push(splittedPath);
			} else {
				const continuePaths = line.map((_, pos) =>
					pathsPositons.includes(pos) ? '|' : '.',
				);
				path.push(continuePaths);
			}
		} else {
			if (line.includes('S')) {
				path.push(line);
				return;
			}
			const continuePaths = line.map((_, pos) =>
				startPosition === pos ? '|' : '.',
			);
			path.push(continuePaths);
		}
	});

	return result;
};
