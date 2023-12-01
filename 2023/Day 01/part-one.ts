import { asyncReadFile } from '../helpers/readFile';

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let total = 0;

	data.forEach(line => {
		let current = '';
		for (const letter of line) {
			const isNumber = !isNaN(parseInt(letter));
			if (isNumber) {
				current += letter;
			}
		}
		current = current[0] + current[current.length - 1];
		total += parseInt(current);
	});

	return total;
};
