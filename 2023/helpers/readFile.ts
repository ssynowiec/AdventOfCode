import { promises as fsPromises } from 'fs';
import { dirname } from 'path';

export const asyncReadFile = async (filename: string) => {
	try {
		const contents = await fsPromises.readFile(
			filename,

			'utf-8',
		);

		const arr = contents.split(/\r?\n/);

		return arr;
	} catch (err) {
		console.log(err);
	}
};
