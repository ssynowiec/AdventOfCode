import { asyncReadFile } from '@/helpers/readFile';

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const col1: number[] = [];
	const col2: number[] = [];

	data.forEach(line => {
		const [first, second] = line.split('   ');
		col1.push(Number(first));
		col2.push(Number(second));
	});

	col1.sort((a, b) => a - b);
	col2.sort((a, b) => a - b);

	for (let i = 0; i < col1.length; i++) {
		result += col2.filter(item => item === col1[i]).length * col1[i];
	}

	return result;
};
