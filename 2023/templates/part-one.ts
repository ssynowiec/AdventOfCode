import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {});

	return result;
};
