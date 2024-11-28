import { asyncReadFile } from '../helpers/readFile';

const getASCIICode = (char: string) => {
	return char.charCodeAt(0);
};

const getBoxNumber = (chars: string) => {
	let stepValue = 0;
	chars.split('').forEach(char => {
		stepValue += getASCIICode(char);
		stepValue *= 17;
		stepValue %= 256;
	});

	return stepValue;
};

export const partTwo = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const boxes: { box: number; values: string[] }[] = [];
	for (let i = 0; i <= 255; i++) {
		boxes.push({ box: i, values: [] });
	}

	data.forEach(line => {
		const steps = line.split(',');
		steps.forEach((step, i) => {
			let boxNumber = 0,
				key = '',
				value = '';

			if (step.includes('=')) {
				boxNumber = getBoxNumber(step.split('=')[0]);
				[key, value] = step.split('=');

				const stepExists = boxes[boxNumber].values.find(v =>
					v.includes(key),
				);

				if (!stepExists) {
					boxes[boxNumber].values.push(`${key} ${value}`);
				} else {
					const index = boxes[boxNumber].values.indexOf(stepExists);
					boxes[boxNumber].values[index] = `${key} ${value}`;
				}
			} else if (step.includes('-')) {
				boxNumber = getBoxNumber(step.split('-')[0]);
				[key, value] = step.split('-');

				const stepExists = boxes[boxNumber].values.find(v =>
					v.includes(key),
				);

				if (stepExists) {
					const index = boxes[boxNumber].values.indexOf(stepExists);
					boxes[boxNumber].values.splice(index, 1);
				}
			}
		});
	});

	boxes.forEach(box => {
		if (box.values.length !== 0) {
			box.values.forEach((value, slot) => {
				const [key, stepValue] = value.split(' ');
				console.log(
					key,
					':',
					box.box + 1,
					`(box ${box.box}) *`,
					slot + 1,
					'*',
					stepValue,
					'=',
					(box.box + 1) * (slot + 1) * parseInt(stepValue),
				);

				result += (box.box + 1) * (slot + 1) * parseInt(stepValue);
			});
		}
	});

	return result;
};
