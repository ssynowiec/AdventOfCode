export const colsToRows = <T>(arr: T[][]) =>
	arr[0]?.map((_, colIndex) => arr.map(row => row[colIndex])) ?? [];
