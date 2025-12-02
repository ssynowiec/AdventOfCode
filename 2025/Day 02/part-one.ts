import { readFile } from '@/helpers/read-file';

export const partOne = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	data.forEach(line => {
		const ranges = line
			.split(',')
			.map(range => range.split('-').map(Number));

		ranges.forEach(range => {
			console.log('===============');

			const [start, end] = range;
			for (let number = start; number <= end; number++) {
				if (number.toString().length % 2 !== 0) {
					continue;
				}

				const firstHalf = number
					.toString()
					.substring(0, number.toString().length / 2);

				const secondHalf = number
					.toString()
					.substring(number.toString().length / 2);

				if (firstHalf === secondHalf) {
					result += number;
					continue;
				}
			}
		});
	});

	return result;
};
