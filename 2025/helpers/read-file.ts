import * as fs from 'fs';

export const readFile = (filename: string): string[] => {
	try {
		const fileContent = fs.readFileSync(filename, 'utf-8');

		const lines = fileContent.split(/\r?\n/);

		return lines;
	} catch (err) {
		console.log(err);
		return [];
	}
};
