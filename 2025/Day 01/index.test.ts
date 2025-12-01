import { test, expect } from '@playwright/test';
import { partOne } from './part-one';

test.describe('Day 01', () => {
	const expectedResult1 = 3;
	test(`Part 1 should return ${expectedResult1}`, async () => {
		const result = partOne(__dirname + '/test.data.txt');

		expect(result).toBe(expectedResult1);

		if (result === expectedResult1) {
			const value = partOne(__dirname + '/input.data.txt');
			console.log('Part 1:', value);
		}
	});
});
