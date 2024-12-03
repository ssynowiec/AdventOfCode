import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	data.forEach(line => {
		const regex = /mul\(\d+,\d+\)/g;
		const parsedLine = line.match(regex) || [];

		parsedLine.forEach(operation => {
			const matches = operation.match(/\d+/g);
			if (matches) {
				const [a, b] = matches.map(Number);
				result += a * b;
			}
		});

		console.log(parsedLine);
	});

	return result;
};
