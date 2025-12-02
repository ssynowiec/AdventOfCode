import { readFile } from '@/helpers/read-file';

export const partTwo = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	data.forEach(line => {
		const ranges = line
			.split(',')
			.map(range => range.split('-').map(Number));

		ranges.forEach(range => {
			const [start, end] = range;
			for (let number = start; number <= end; number++) {
				const numStr = number.toString();

				let testpattern = '';
				for (
					let index = 0;
					index < Math.round(numStr.length / 2);
					index++
				) {
					testpattern += numStr[index];

					if (
						testpattern.length >
						numStr.length - Math.round(numStr.length / 2)
					) {
						continue;
					}

					const t = [];

					for (
						let j = 0;
						j < numStr.length;
						j += testpattern.length
					) {
						const element = numStr.substring(
							j,
							j + testpattern.length,
						);

						if (testpattern === numStr) {
							break;
						}

						t.push(element === testpattern);
					}

					if (t.every(v => v === true)) {
						result += number;
						break;
					}
				}
			}
		});
	});

	return result;
};
