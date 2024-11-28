import { asyncReadFile } from '../helpers/readFile';

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const partNumbers: {
		line: number;
		partNumber: { value?: string; index?: string };
	}[] = [];
	let result = 0;
	let partNumber: { value?: string; index?: string } = {
		value: '0',
		index: '0.0',
	};

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

		// console.log(liczby, indexes);
		indexes.forEach(index => {
			const number = index.number;

			const startIndex = index.index;
			const endIndex = startIndex + number.length - 1;

			const leftCenter = line[startIndex - 1];
			const rightCenter = line[endIndex + 1];

			const topLine = i > 0 ? data[i - 1] : undefined;
			const bottomLine = i < data.length - 1 ? data[i + 1] : undefined;

			let isPartNumber = false;
			let charIndex = undefined;

			if (
				(leftCenter === '*' && leftCenter !== undefined) ||
				(rightCenter === '*' && rightCenter !== undefined)
			) {
				isPartNumber = true;
				if (leftCenter === '*') {
					charIndex = line.indexOf('*');
					charIndex = `${i},${startIndex - 1}`;
				} else {
					charIndex = line.indexOf('*');
					charIndex = `${i},${startIndex + 1}`;
				}
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
					?.filter(symbol => symbol !== undefined && symbol === '*');
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
					?.filter(symbol => symbol !== undefined && symbol === '*');
			}

			if (topSymbols?.length > 0 || bottomSymbols?.length > 0) {
				isPartNumber = true;
				if (topSymbols?.length > 0) {
					charIndex = topLine?.indexOf('*');
					charIndex = `${charIndex},${i - 1}`;
				} else {
					charIndex = bottomLine?.indexOf('*');
					charIndex = `${charIndex},${i + 1}`;
				}
			}

			if (isPartNumber) {
				partNumber = { value: number, index: charIndex };
				partNumbers.push({ line: i, partNumber });
			}
		});
	});

	console.log(partNumbers);

	const filtered = partNumbers.filter((number, i) => {
		return (
			number.partNumber.index === partNumbers[i - 1]?.partNumber.index ||
			number.partNumber.index === partNumbers[i + 1]?.partNumber.index
		);
	});

	// console.log(filtered);

	for (let f = 0; f < filtered.length; f += 2) {
		result +=
			parseInt(filtered[f].partNumber.value as string) *
			parseInt(filtered[f + 1].partNumber.value as string);
	}

	// console.log(filtered);

	return result;
};
