import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		let lineValue = 0;
		const clearedLine = line.slice(line.indexOf(': ') + 2, line.length);
		const winsNumbers = clearedLine
			.slice(0, clearedLine.indexOf('|') - 1)
			.split(' ')
			.filter(element => !isNaN(parseInt(element)));
		const elfNumbers = clearedLine
			.slice(clearedLine.indexOf('|') + 1, clearedLine.length)
			.split(' ')
			.filter(element => !isNaN(parseInt(element)));

		elfNumbers.forEach(number => {
			winsNumbers.forEach(winNumber => {
				if (number === winNumber) {
					lineValue = lineValue === 0 ? 1 : (lineValue *= 2);
				}
			});
		});

		result += lineValue;
	});

	return result;
};
