import { asyncReadFile } from '../helpers/readFile';

const splitArray = (array: string[], separator: string) => {
	const separatorIndex = array.indexOf(separator);

	if (separatorIndex === -1) {
		return [array];
	}

	const firstPart = array.slice(0, separatorIndex);
	const secondPart = array.slice(separatorIndex + 1);

	return [firstPart, secondPart];
};

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const [firstPart, secondPart] = splitArray(data, '');

	const firstWorkflow = 'in';

	const accepted: { x: string; m: string; a: string; s: string }[] = [];

	secondPart.forEach(line => {
		let workflow = firstWorkflow;
		const rates = line.substring(1, line.length - 1);
		const [xString, mString, aString, sString] = rates.split(',');
		const [xValue, x] = xString.split('=');
		const [mValue, m] = mString.split('=');
		const [aValue, a] = aString.split('=');
		const [sValue, s] = sString.split('=');

		const rate = { x, m, a, s };

		while (workflow !== 'R' && workflow !== 'A') {
			workflow = firstPart.filter(line =>
				line.startsWith(workflow + '{'),
			)[0];

			const startIndex = workflow.indexOf('{');
			workflow = workflow.substring(startIndex + 1, workflow.length - 1);

			const rules = workflow.split(',');
			const ifFale: string = rules.pop() ?? '';

			for (let i = 0; i < rules.length; i++) {
				const rule = rules[i];
				const [condition, destination] = rule.split(':');

				if (eval(condition)) {
					workflow = destination;
					break;
				} else if (i === rules.length - 1) {
					workflow = ifFale;
				} else {
					continue;
				}
			}
		}

		if (workflow === 'A') {
			accepted.push(rate);
		}
	});

	result = accepted.reduce((acc, rate) => {
		acc +=
			Number(rate.x) + Number(rate.m) + Number(rate.a) + Number(rate.s);
		return acc;
	}, 0);

	return result;
};
