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

const replaceElement = (
	page1Index: number,
	page2Index: number,
	update: number[],
) => {
	[update[page1Index], update[page2Index]] = [
		update[page2Index],
		update[page1Index],
	];
};

export const partTwo = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);
	const [rules, updates] = splitArray(data, '');

	updates.forEach(update => {
		let wasIncorrect = false;
		let parsedUpdate = update.split(',').map(Number);

		let changes = true;
		while (changes) {
			changes = false;
			rules.forEach(rule => {
				const [page1, page2] = rule.split('|').map(Number);
				const page1Index = parsedUpdate.indexOf(page1);
				const page2Index = parsedUpdate.indexOf(page2);

				if (
					page1Index > -1 &&
					page2Index > -1 &&
					page1Index > page2Index
				) {
					replaceElement(page1Index, page2Index, parsedUpdate);
					changes = true;
					wasIncorrect = true;
				}
			});
		}

		if (wasIncorrect) {
			const centralIndex = Math.floor(parsedUpdate.length / 2);
			result += parsedUpdate[centralIndex];
			console.log('Incorrect:', update);
			console.log('Correct:', parsedUpdate);
		}
	});

	return result;
};
