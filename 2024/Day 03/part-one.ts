import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	data.forEach(line => {
		const parsedLine = line.split(' ');
	});

	return result;
};
