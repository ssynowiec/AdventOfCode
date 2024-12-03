import { asyncReadFile } from '@/helpers/readFile';

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);
	data.forEach(line => {
		const parsedLine = line.split(' ').map(Number);
	});

	return result;
};
