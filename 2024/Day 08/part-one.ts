import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	const data = await asyncReadFile(input);
	let result = 0;

	data.forEach(line => {});

	return result;
};
