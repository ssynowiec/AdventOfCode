import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	data.forEach(line => {
		let current = '';
	});

	return result;
};
