import { asyncReadFile } from '../helpers/readFile';

const transformTable = (table: string[]): string[] => {
	let transformedTable: string[] = [];
	for (let i = 0; i < table[0].length; i++) {
		let newColumn: string = '';
		for (let j = 0; j < table.length; j++) {
			newColumn += table[j][i];
		}
		transformedTable.push(newColumn);
	}
	return transformedTable;
};

const isRowMirror = (table: string[], probableMirrorIndex: number) => {
	let i = 0;

	while (
		table[probableMirrorIndex - i] !== undefined &&
		table[probableMirrorIndex + 1 + i] !== undefined
	) {
		if (
			table[probableMirrorIndex - i] !==
			table[probableMirrorIndex + 1 + i]
		) {
			return false;
		}

		i += 1;
	}

	return true;
};

const findMirrorIndex = (table: string[]) => {
	let mid = Math.floor(table.length / 2);
	for (let offset = 0; offset <= mid; offset++) {
		let isMirror = true;
		for (let i = 0; i <= mid - offset; i++) {
			if (table[mid - offset - i] !== table[mid + offset + i]) {
				isMirror = false;
				break;
			}
		}
		if (isMirror) {
			return mid - offset;
		}
		isMirror = true;
		for (let i = 0; i < mid - offset; i++) {
			if (table[mid - offset + 1 + i] !== table[mid + offset - 1 - i]) {
				isMirror = false;
				break;
			}
		}
		if (isMirror) {
			return mid - offset + 1;
		}
	}
	return -1;
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const transfomredData: string[][] = [];
	let transformedLine: string[] = [];
	data.forEach(line => {
		if (line.length === 0) {
			transfomredData.push(transformedLine);
			transformedLine = [];
		} else {
			transformedLine.push(line);
		}
	});

	transfomredData.forEach(table => {
		let rowValue = findMirrorIndex(table) + 1;

		const transformedTable = transformTable(table);
		let columnValue = findMirrorIndex(transformedTable) + 1;

		if (columnValue !== -1) {
			if (
				isRowMirror(transformedTable, findMirrorIndex(transformedTable))
			) {
				rowValue = 0;
			} else if (isRowMirror(table, findMirrorIndex(table))) {
				rowValue *= 100;
				columnValue = 0;
			} else {
				rowValue = 0;
				columnValue = 0;
			}
		}

		result += rowValue + columnValue;
	});

	return result;
};
