import { asyncReadFile } from '@/helpers/readFile';

const generateCombinations = (
	length: number,
	operators: string[],
): string[][] => {
	if (length === 0) return [[]];
	const smallerCombos = generateCombinations(length - 1, operators);
	return smallerCombos.flatMap(combo => operators.map(op => [...combo, op]));
};

const evaluate = (numbers: number[], operators: string[]): number => {
	return operators.reduce(
		(acc, op, i) =>
			op === '+' ? acc + numbers[i + 1] : acc * numbers[i + 1],
		numbers[0],
	);
};

export const partOne = async (input: string): Promise<number> => {
	const data = await asyncReadFile(input);
	let result = 0;

	data.forEach(line => {
		const [testValue, numbersStr] = line.split(': ');
		const target = Number(testValue);
		const numbers = numbersStr.split(' ').map(Number);

		const operators = ['+', '*'];
		const operatorCombos = generateCombinations(
			numbers.length - 1,
			operators,
		);

		let isValid = false;

		operatorCombos.forEach(ops => {
			const value = evaluate(numbers, ops);
			if (value === target) {
				isValid = true;
				return;
			}
		});

		if (isValid) {
			result += target;
		}
	});

	return result;
};
