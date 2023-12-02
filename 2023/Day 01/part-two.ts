import { asyncReadFile } from '../helpers/readFile';

export const partTwo = async (input: string) => {
	let result = 0;

	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	const reg = /one|two|three|four|five|six|seven|eight|nine|\d/;
	data.forEach(line => {
		const matches = [];

		while (reg.exec(line)) {
			const match = reg.exec(line);
			if (match) {
				matches.push(match[0]);
				line = line.slice(match.index + 1);
			}
		}

		const convertedLine: string[] = [];
		matches.forEach(m => {
			switch (m) {
				case 'one':
					convertedLine.push('1');
					break;
				case 'two':
					convertedLine.push('2');
					break;
				case 'three':
					convertedLine.push('3');
					break;
				case 'four':
					convertedLine.push('4');
					break;
				case 'five':
					convertedLine.push('5');
					break;
				case 'six':
					convertedLine.push('6');
					break;
				case 'seven':
					convertedLine.push('7');
					break;
				case 'eight':
					convertedLine.push('8');
					break;
				case 'nine':
					convertedLine.push('9');
					break;
				default:
					convertedLine.push(m);
					break;
			}
		});

		const lineValue =
			convertedLine[0] + convertedLine[convertedLine.length - 1];

		result += parseInt(lineValue);
	});

	return result;
};
