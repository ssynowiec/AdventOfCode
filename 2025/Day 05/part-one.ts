import { readFile } from '@/helpers/read-file';

export const partOne = (input: string): number => {
	const data = readFile(input);

	const separateId = data.indexOf('');
	const ranges = data.slice(0, separateId);
	const ids = data.slice(separateId + 1).map(Number);

	let result = 0;

	ids.forEach(id => {
		let counted = false;
		ranges.forEach(range => {
			const [minStr, maxStr] = range.split('-').map(Number);
			const min = Number(minStr);
			const max = Number(maxStr);

			if (id >= min && id <= max && !counted) {
				result++;
				counted = true;
				return;
			}
		});
	});

	return result;
};
