import { asyncReadFile } from '@/helpers/readFile';

const rule1 = (stones: number[], index: number) => {
	stones[index] = 1;
};

const rule2 = (stone: number, index: number, stones: number[]) => {
	const newLeftStone = stone.toString().slice(0, stone.toString().length / 2);
	const newRightStone = stone.toString().slice(stone.toString().length / 2);

	stones[index] = Number(newLeftStone);
	stones.splice(index + 1, 0, Number(newRightStone));
};

const rule3 = (stone: number, index: number, stones: number[]) => {
	stones[index] = stone * 2024;
};

export const partOne = async (input: string): Promise<number> => {
	const data = await asyncReadFile(input);
	const line = data[0];
	const stones = line.split(' ').map(Number);

	for (let i = 0; i < 25; i++) {
		for (let stoneIndex = 0; stoneIndex < stones.length; stoneIndex++) {
			if (stones[stoneIndex] === 0) {
				rule1(stones, stoneIndex);
			} else if (stones[stoneIndex].toString().length % 2 === 0) {
				rule2(stones[stoneIndex], stoneIndex, stones);
				stoneIndex++;
			} else {
				rule3(stones[stoneIndex], stoneIndex, stones);
			}
		}
	}

	return stones.length;
};
