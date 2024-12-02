import { asyncReadFile } from '@/helpers/readFile';

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	data.forEach(line => {
		const parsedLine = line.split(' ');
		let safe = true;
		const direction =
			Number(parsedLine[0]) > Number(parsedLine[1])
				? 'decrease'
				: 'increase';
		for (let i = 1; i < parsedLine.length; i++) {
			const current = Number(parsedLine[i]);
			const previous = Number(parsedLine[i - 1]);

			if (
				direction === 'increase' &&
				(current <= previous || current - previous > 3)
			) {
				safe = false;
				break;
			} else if (
				direction === 'decrease' &&
				(current >= previous || previous - current > 3)
			) {
				safe = false;
				break;
			}
		}

		if (safe) {
			result++;
		}
	});

	return result;
};
