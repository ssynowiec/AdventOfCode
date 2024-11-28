import { asyncReadFile } from '../helpers/readFile';

const arraysEqual = (a: any[], b: any[]): boolean => {
	if (a.length !== b.length) return false;
	for (let i = 0; i < a.length; i++) {
		if (a[i] !== b[i]) return false;
	}
	return true;
};

const allVariants: any = (line: string, groups: number[]) => {
	if (!line.includes('?')) {
		let counts = line
			.split('.')
			.filter(x => x.length > 0)
			.map(x => x.length);
		if (arraysEqual(counts, groups)) {
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

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		let [records, condition] = line.split(' ');
		console.log(records, condition);

		for (let i = 0; i < 5; i++) {
			records = records + '?' + records;
			condition = condition + ',' + condition;
		}
		const groups = condition.split(',').map(Number);

		for (let variant of allVariants(records, groups)) {
			result++;
		}
	});

	return result;
};
