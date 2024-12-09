import { asyncReadFile } from '@/helpers/readFile';
import { log } from 'console';

export const partOne = async (input: string): Promise<number> => {
	const data = await asyncReadFile(input);
	const line = data[0];
	let result = 0;

	const blocks: string[] = [];
	let index = 0;
	line.split('').forEach((char, arrIndex) => {
		if (arrIndex % 2 !== 0) {
			blocks.push(...new Array(parseInt(char)).fill('.'));
		} else {
			blocks.push(...new Array(parseInt(char)).fill(index.toString()));
			index++;
		}
	});

	let left = 0;
	let right = blocks.length - 1;

	while (left < right) {
		if (blocks[left] === '.') {
			while (right > left && blocks[right] === '.') {
				right--;
			}

			if (blocks[right] !== '.') {
				[blocks[left], blocks[right]] = [blocks[right], blocks[left]];
				left++;
				right--;
			} else {
				break;
			}
		} else {
			left++;
		}
	}

	blocks.forEach((block, index) => {
		if (block === '.') return;
		result += parseInt(block) * index;
	});

	return result;
};
