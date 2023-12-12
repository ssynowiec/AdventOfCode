import { asyncReadFile } from '../helpers/readFile';

const allVariants: any = (line: string, groups: number[]) => {
	if (!line.includes('?')) {
		let counts = line
			.split('.')
			.filter(x => x.length > 0)
			.map(x => x.length);
		if (JSON.stringify(counts) === JSON.stringify(groups)) {
			return [line];
		} else {
			return [];
		}
	}

	let index = line.indexOf('?');

	let line1 = line.slice(0, index) + '#' + line.slice(index + 1);
	let line2 = line.slice(0, index) + '.' + line.slice(index + 1);

	return allVariants(line1, groups).concat(allVariants(line2, groups));
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		const [records, condition] = line.split(' ');

		const groups = condition.split(',').map(Number);

		result += allVariants(records, groups).length;
	});

	return result;
};
