import { readFile } from '@/helpers/read-file';

export const partOne = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	data.forEach(line => {
		const ratings = line.split('');

		let max = 0;
		ratings.forEach((rating, index) => {
			for (let i = index + 1; i < ratings.length; i++) {
				const element = ratings[i];
				const potentialMax = Number(rating + element);
				if (potentialMax > max) {
					max = potentialMax;
				}
			}
		});

		result += max;
	});

	return result;
};
