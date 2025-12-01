import { readFile } from '@/helpers/read-file';

export const partOne = (input: string): number => {
	const data = readFile(input);

	let countPos0 = 0;
	let currentPos = 50;

	data.forEach(line => {
		const parts = line.match(/^([A-Za-z]+)(\d+)$/);
		const direction = parts ? parts[1] : '';
		const value = parts ? parseInt(parts[2]) : 0;

		switch (direction) {
			case 'L':
				currentPos -= value;
				if (currentPos < 0) {
					currentPos = 100 + currentPos;
				}
				break;
			case 'R':
				currentPos += value;
				if (currentPos > 100) {
					currentPos = currentPos - 100;
				}
				break;
		}

		while (currentPos < 0) {
			currentPos = 100 + currentPos;
		}

		while (currentPos > 100) {
			currentPos = currentPos - 100;
		}

		if (currentPos === 100) {
			currentPos = 0;
		}

		if (currentPos === 0) {
			countPos0 += 1;
		}
	});

	return countPos0;
};

// console.log(partOne('/input.data.txt'));
