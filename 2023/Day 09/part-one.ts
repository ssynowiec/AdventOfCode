import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		const lineNumbers = line.split(' ').map(number => parseInt(number));

		const lines: number[][] = [lineNumbers];

		let lastLineIsZero: boolean = lineNumbers.every(number => number === 0);

		let lastLine = lineNumbers;
		while (!lastLineIsZero) {
			let newLine: number[] = [];
			for (let i = 0; i < lastLine.length - 1; i++) {
				const number = lastLine[i];
				const nexNumber = lastLine[i + 1];
				newLine.push(nexNumber - number);
			}
			lastLine = newLine;
			lastLineIsZero = newLine.every(number => number === 0);
			lines.push(newLine);
		}

		let sum = 0;
		for (let i = lines.length - 1; i >= 0; i--) {
			const line = lines[i];
			const lastNumber = line[line.length - 1];
			sum += lastNumber;
		}
		result += sum;
	});

	return result;
};
