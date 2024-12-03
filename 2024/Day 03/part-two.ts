import { asyncReadFile } from '@/helpers/readFile';

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	let isEnabled = true;

	data.forEach(line => {
		const regex = /(mul\(\d+,\d+\)|do\(\)|don't\(\))/g;
		const parsedLine = line.match(regex) || [];

		parsedLine.forEach(operation => {
			if (operation === 'do()') {
				isEnabled = true;
			}

			if (operation === "don't()") {
				isEnabled = false;
			}

			const matches = operation.match(/\b\d{1,3}\b/g);
			if (matches && isEnabled) {
				const [a, b] = matches.map(Number);
				result += a * b;
			}
		});
	});

	return result;
};
