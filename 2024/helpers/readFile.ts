import { promises as fsPromises } from 'fs';

export const asyncReadFile = async (filename: string): Promise<string[]> => {
	try {
		const contents = await fsPromises.readFile(filename, 'utf-8');

		const arr = contents.split(/\r?\n/);

		return arr;
	} catch (err) {
		console.log(err);
		return [];
	}
};
