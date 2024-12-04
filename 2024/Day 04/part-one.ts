import { asyncReadFile } from '@/helpers/readFile';

const checkToUp = (data: string[], x: number, y: number): boolean => {
	if (y - 3 < 0) return false;
	let string = '';
	for (let i = y; i > y - 4; i--) {
		string += data[i][x];
	}
	return string === 'XMAS';
};

const checkToDown = (data: string[], x: number, y: number): boolean => {
	if (y + 3 >= data.length) return false;
	let string = '';
	for (let i = y; i < y + 4; i++) {
		string += data[i][x];
	}
	return string === 'XMAS';
};

const checkToRight = (row: string, x: number): boolean => {
	if (x + 4 >= row.length) return false;
	return row.slice(x, x + 4) === 'XMAS';
};

const checkToLeft = (row: string, x: number): boolean => {
	if (x - 3 < 0) return false;
	return row.slice(x - 3, x + 1) === 'SAMX';
};

const checkDiagonalTopLeftToBottomRight = (
	data: string[],
	x: number,
	y: number,
): boolean => {
	if (x + 3 > data[0].length || y + 4 > data.length) return false;
	let string = '';
	for (let i = 0; i < 4; i++) {
		string += data[y + i][x + i];
	}
	return string === 'XMAS';
};

const checkDiagonalTopRightToBottomLeft = (
	data: string[],
	x: number,
	y: number,
): boolean => {
	if (x - 3 < 0 || y + 4 > data.length) return false;
	let string = '';
	for (let i = 0; i < 4; i++) {
		string += data[y + i][x - i];
	}
	return string === 'XMAS';
};

const checkDiagonalBottomLeftToTopRight = (
	data: string[],
	x: number,
	y: number,
): boolean => {
	if (x + 3 > data[0].length || y - 3 < 0) return false;
	let string = '';
	for (let i = 0; i < 4; i++) {
		string += data[y - i][x + i];
	}
	return string === 'XMAS';
};

const checkDiagonalBottomRightToTopLeft = (
	data: string[],
	x: number,
	y: number,
): boolean => {
	if (x - 3 < 0 || y - 3 < 0) return false;
	let string = '';
	for (let i = 0; i < 4; i++) {
		string += data[y - i][x - i];
	}
	return string === 'XMAS';
};

export const partOne = async (input: string): Promise<number> => {
	let result = 0;

	const data = await asyncReadFile(input);

	for (let y = 0; y < data.length; y++) {
		const row = data[y];
		for (let x = 0; x < row.length; x++) {
			const char = row[x];
			if (char === 'X') {
				if (checkToUp(data, x, y)) result++;
				if (checkToDown(data, x, y)) result++;
				if (checkToRight(row, x)) result++;
				if (checkToLeft(row, x)) result++;

				if (checkDiagonalTopLeftToBottomRight(data, x, y)) result++;
				if (checkDiagonalTopRightToBottomLeft(data, x, y)) result++;
				if (checkDiagonalBottomLeftToTopRight(data, x, y)) result++;
				if (checkDiagonalBottomRightToTopLeft(data, x, y)) result++;
			}
		}
	}

	return result;
};
