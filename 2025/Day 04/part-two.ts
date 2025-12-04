import { readFile } from '@/helpers/read-file';

export const partTwo = (input: string): number => {
	const data = readFile(input);

	let result = 0;

	let nothingToRemove = true;
	while (nothingToRemove) {
		const positionsToRemove: Array<[number, number]> = [];
		data.forEach((rolls, row) => {
			rolls.split('').forEach((roll, column) => {
				if (roll !== '@') {
					return;
				}

				const adjacents = [
					row > 0 ? data[row - 1].split('')[column] : undefined, // up
					row < data.length - 1
						? data[row + 1].split('')[column]
						: undefined, // down
					row > 0 ? data[row - 1].split('')[column - 1] : undefined, // up-left
					row > 0 ? data[row - 1].split('')[column + 1] : undefined, // up-right
					row < data.length - 1
						? data[row + 1].split('')[column - 1]
						: undefined, // down-left
					row < data.length - 1
						? data[row + 1].split('')[column + 1]
						: undefined, // down-right
					data[row].split('')[column - 1], // left
					data[row].split('')[column + 1], // right
				];

				if (adjacents.filter(adj => adj === '@').length < 4) {
					result++;
					positionsToRemove.push([row, column]);
				}
			});
		});

		if (positionsToRemove.length === 0) {
			nothingToRemove = false;
		}

		positionsToRemove.forEach(([row, column]) => {
			const rolls = data[row].split('');
			rolls[column] = 'x';
			data[row] = rolls.join('');
		});
	}

	return result;
};
