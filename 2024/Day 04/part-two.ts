import { asyncReadFile } from '@/helpers/readFile';

const checkIsMAS = (data: string[], x: number, y: number): boolean => {
	const topLeft = data[y - 1]?.[x - 1];
	const topRight = data[y - 1]?.[x + 1];
	const bottomLeft = data[y + 1]?.[x - 1];
	const bottomRight = data[y + 1]?.[x + 1];

	const string1 = `${topLeft}${data[y][x]}${bottomRight}`;
	const string2 = `${topRight}${data[y][x]}${bottomLeft}`;

	return (
		(string1 === 'MAS' && string2 === 'SAM') ||
		(string1 === 'SAM' && string2 === 'MAS') ||
		(string1 === 'MAS' && string2 === 'MAS') ||
		(string1 === 'SAM' && string2 === 'SAM')
	);
};

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	for (let y = 0; y < data.length; y++) {
		const row = data[y];
		for (let x = 0; x < row.length; x++) {
			const char = row[x];
			if (char === 'A') {
				if (checkIsMAS(data, x, y)) {
					result++;
				}
			}
		}
	}

	return result;
};
