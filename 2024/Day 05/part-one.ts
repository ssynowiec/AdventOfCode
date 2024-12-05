import { asyncReadFile } from '@/helpers/readFile';

const splitArray = (array: string[], delimiter: string): string[][] => {
	return array.reduce(
		(acc: string[][], line: string) => {
			if (line === delimiter) acc.push([]);
			else acc[acc.length - 1].push(line);
			return acc;
		},
		[[]],
	);
};

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	const [rules, updates] = splitArray(data, '');

	updates.forEach(update => {
		let isValid = true;
		rules.forEach(rule => {
			const [page1, page2] = rule.split('|');
			const page1Index = update.indexOf(page1);
			const page2Index = update.indexOf(page2);

			if (page1Index > -1 && page2Index > -1 && page1Index > page2Index) {
				isValid = false;
			}
		});
		if (isValid) {
			const correctUpdate = update.split(',').map(Number);
			const centalIndex = Math.floor(correctUpdate.length / 2);
			result += correctUpdate[centalIndex];
		}
	});

	return result;
};
