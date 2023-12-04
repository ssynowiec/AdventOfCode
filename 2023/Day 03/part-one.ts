import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach((line, i) => {
		const regex = /\d+/g;

		const liczby = Array.from(line.matchAll(regex)).map(
			numbers => numbers[0],
		);

		const indexes: { number: string; index: number }[] = [];
		let lineCopy = line;

		liczby.forEach(number => {
			const index = lineCopy.indexOf(number);
			indexes.push({ number, index });

			let replacment = '';

			for (let r = 0; r < number.length; r++) {
				replacment += '.';
			}

			lineCopy =
				lineCopy.substring(0, index) +
				replacment +
				lineCopy.substring(index + number.length);
		});

		indexes.forEach(index => {
			const number = index.number;

			const startIndex = index.index;
			const endIndex = startIndex + number.length - 1;

			const leftCenter = line[startIndex - 1];
			const rightCenter = line[endIndex + 1];

			const topLine = i > 0 ? data[i - 1] : undefined;
			const bottomLine = i < data.length - 1 ? data[i + 1] : undefined;

			let isPartNumber = false;

			if (
				(leftCenter !== '.' && leftCenter !== undefined) ||
				(rightCenter !== '.' && rightCenter !== undefined)
			) {
				isPartNumber = true;
			}

			let topSymbols: string[] = [];
			let bottomSymbols: string[] = [];

			if (topLine) {
				topSymbols = topLine
					?.split('')
					?.splice(
						startIndex - 1 === -1 ? 0 : startIndex - 1,
						startIndex - 1 === -1
							? number.length + 1
							: number.length + 2,
					)
					?.filter(symbol => symbol !== undefined && symbol !== '.');
			}

			if (bottomLine) {
				bottomSymbols = bottomLine
					?.split('')
					?.splice(
						startIndex - 1 === -1 ? 0 : startIndex - 1,
						startIndex - 1 === -1
							? number.length + 1
							: number.length + 2,
					)
					?.filter(symbol => symbol !== undefined && symbol !== '.');
			}

			if (topSymbols?.length > 0 || bottomSymbols?.length > 0) {
				isPartNumber = true;
			}

			if (isPartNumber) {
				result += parseInt(number);
			}
		});
	});

	return result;
};
