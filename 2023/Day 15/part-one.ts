import { asyncReadFile } from '../helpers/readFile';

const getASCIICode = (char: string) => {
	return char.charCodeAt(0);
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	data.forEach(line => {
		const steps = line.split(',');
		steps.forEach(step => {
			let stepValue = 0;
			step.split('').forEach(char => {
				stepValue += getASCIICode(char);
				stepValue *= 17;
				stepValue %= 256;
			});
			result += stepValue;
		});
	});

	return result;
};
