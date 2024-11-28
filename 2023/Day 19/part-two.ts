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

const checkFlow = (flow: string, workflows: string[]): number => {
	if (flow === 'R' || flow === 'A') {
		return 4000; // each rating can have a value from 1 to 4000
	}

	const workflow = workflows.filter(line => line.startsWith(flow + '{'))[0];
	const startIndex = workflow.indexOf('{');
	let newFlow = workflow.substring(startIndex + 1, workflow.length - 1);
	let other = '';
	[newFlow, other] = newFlow.split(',');

	if (newFlow.includes('<')) {
		newFlow = newFlow.replace('<', ' ');
		const [condition, destination] = newFlow.split(':');
		const [variable, value] = condition.split(' ');
		const variants = Number(value) - 1; // for '<' condition, possible combinations are from 1 to value - 1
		return variants * checkFlow(destination, workflows);
	} else {
		newFlow = newFlow.replace('>', ' ');
		const [condition, destination] = newFlow.split(':');
		const [variable, value] = condition.split(' ');
		const variants = 4000 - Number(value); // for '>' condition, possible combinations are from value + 1 to 4000
		return variants * checkFlow(destination, workflows);
	}
};

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const [workflows, secondPart] = splitArray(data, '');

	const firstWorkflow = 'in';

	const numberOfAllVariants = 4000 * 4000 * 4000 * 4000;

	const variants: { [key: string]: number } = {
		x: 4000,
		m: 4000,
		a: 4000,
		s: 4000,
	};

	let x = 0,
		m = 0,
		a = 0,
		s = 0;

	let workflow = firstWorkflow;

	while (workflow !== 'R' && workflow !== 'A') {
		workflow = workflows.filter(line => line.startsWith(workflow + '{'))[0];
		const startIndex = workflow.indexOf('{');
		workflow = workflow.substring(startIndex + 1, workflow.length - 1);
		let other = '';
		[workflow, other] = workflow.split(',');

		if (workflow.includes('<')) {
			workflow = workflow.replace('<', ' ');
			const [condition, destination] = workflow.split(':');
			const [variable, value] = condition.split(' ');
			variants[variable] = Number(value) - 1;
			workflow = destination;
		} else {
			workflow = workflow.replace('>', ' ');
			const [condition, destination] = workflow.split(':');
			const [variable, value] = condition.split(' ');
			variants[variable] -= Number(value);
			workflow = destination;
		}
	}

	if (workflow === 'A') {
		x = Number(variants.x);
		m = Number(variants.m);
		a = Number(variants.a);
		s = Number(variants.s);
	}

	console.log(x, m, a, s);

	result = x * m * a * s;

	return result;
};
