import { asyncReadFile } from '@/helpers/readFile';

export const partTwo = async (input: string): Promise<number> => {
	const data = await asyncReadFile(input);
	const line = data[0];
	let result = 0;

	return result;
};
