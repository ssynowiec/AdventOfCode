import { readFile } from '@/helpers/read-file';

export const partTwo = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	data.forEach(line => {
		const digits = line.trim().split('');
		const pick = 12;
		const n = digits.length;
		if (n <= 0) return;

		let start = 0;
		let chosen = '';
		for (let pos = 0; pos < pick; pos++) {
			const lastIndexAllowed = n - (pick - pos);
			let bestIdx = start;
			let bestDigit = -1;
			for (let i = start; i <= lastIndexAllowed; i++) {
				const d = Number(digits[i]);
				if (d > bestDigit) {
					bestDigit = d;
					bestIdx = i;
					if (bestDigit === 9) break;
				}
			}
			chosen += digits[bestIdx];
			start = bestIdx + 1;
		}

		result += Number(chosen);
	});

	return result;
};
