import { asyncReadFile } from '../helpers/readFile';

const checkLine = (
	line: string,
	primaryCards: string[],
	memo: Record<string, number> = {},
) => {
	if (memo[line]) {
		return memo[line];
	}

	let result = 1;
	let lineValue = 0;
	const cardNumber = line.slice(line.indexOf(' ') + 1, line.indexOf(': '));

	const clearedLine = line.slice(line.indexOf(': ') + 2, line.length);
	const winsNumbers = clearedLine
		.slice(0, clearedLine.indexOf('|') - 1)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)));
	const elfNumbers = clearedLine
		.slice(clearedLine.indexOf('|') + 1, clearedLine.length)
		.split(' ')
		.filter(element => !isNaN(parseInt(element)));

	const winsNumbersSet = new Set(winsNumbers);

	elfNumbers.forEach(number => {
		if (winsNumbersSet.has(number)) {
			lineValue += 1;
		}
	});

	if (lineValue === 0) {
		memo[line] = result;
		return result;
	}

	for (let i = 0; i < lineValue; i++) {
		const element = primaryCards[parseInt(cardNumber) + i];
		result += checkLine(element, primaryCards, memo);
	}

	memo[line] = result;
	return result;
};

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const primaryCards = data;
	let result = 0;

	data.forEach(line => {
		result += checkLine(line, primaryCards);
	});

	return result;
};
