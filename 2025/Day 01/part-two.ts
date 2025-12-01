import { readFile } from '@/helpers/read-file';

export const partTwo = (input: string): number => {
	const data = readFile(input);

	let countPos0 = 0;
	let currentPos = 50;

	data.forEach(line => {
		const parts = line.match(/^([A-Za-z]+)(\d+)$/);
		const direction = parts ? parts[1] : '';
		const value = parts ? parseInt(parts[2]) : 0;

		if (direction === 'R') {
			let first = (100 - currentPos) % 100;
			if (first === 0) first = 100;
			if (value >= first) {
				countPos0 += 1 + Math.floor((value - first) / 100);
			}
			currentPos = (currentPos + value) % 100;
		} else if (direction === 'L') {
			let first = currentPos === 0 ? 100 : currentPos;
			if (value >= first) {
				countPos0 += 1 + Math.floor((value - first) / 100);
			}
			currentPos = (((currentPos - value) % 100) + 100) % 100;
		}
	});

	return countPos0;
};
