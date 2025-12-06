import { readFile } from '@/helpers/read-file';

export const partOne = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	const splitted = data.map(line =>
		line
			.split(' ')
			.map(el => el.trim())
			.filter(el => el !== ''),
	);

	const x = splitted.length;
	const y = splitted[0].length;

	for (let i = 0; i < y; i++) {
		let col = '';
		for (let j = 0; j < x; j++) {
			const element = splitted[j][i];
			col += ' ' + element;
		}
		let operation = '';
		col.split(' ')
			.filter(el => el !== '')
			.forEach((num, i, arr) => {
				if (!isNaN(Number(num))) {
					if (i === arr.length - 2) {
						operation += num;
					} else {
						operation += num + arr[arr.length - 1];
					}
				} else {
					operation += '';
				}
			});
		result += eval(operation);
	}

	return result;
};
