import { asyncReadFile } from '@/helpers/readFile';

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	return result;
};
