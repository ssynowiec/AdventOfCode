import { asyncReadFile } from '../helpers/readFile';

type Hand = {
	cards: string;
	value: number;
	pairs?: string;
	power?: number;
	type: string;
};

function identifyHand(hand: string): string {
	const counts = new Map<string, number>();
	for (const card of hand) {
		counts.set(card, (counts.get(card) || 0) + 1);
	}

	const frequencies = Array.from(counts.values()).sort((a, b) => b - a);

	if (frequencies.length === 1) return '55: Five of a kind';
	if (frequencies.includes(4)) return '44: Four of a kind';
	if (frequencies.includes(3) && frequencies.includes(2))
		return '33: Full house';
	if (frequencies.includes(3)) return '32: Three of a kind';
	if (frequencies.filter(f => f === 2).length === 2) return '22: Two pair';
	if (frequencies.includes(2)) return '11: One pair';
	return '00: High card';
}

export const partOne = async (input: string) => {
	const data = await asyncReadFile(input);

	if (!data) {
		return 0;
	}

	let result = 0;

	const hands: Hand[] = [];

	const cardsValues: Record<number | string, number> = {
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 6,
		7: 7,
		8: 8,
		9: 9,
		T: 10,
		J: 11,
		Q: 12,
		K: 13,
		A: 14,
	};

	data.forEach(line => {
		const [cards, value] = line.split(' ');

		let type = '';

		type = identifyHand(cards);

		hands.push({ cards, value: parseInt(value), type });
	});

	const sortHand = (handA: Hand, handB: Hand) => {
		const handAType = handA.type;
		const handBType = handB.type;

		if (handAType > handBType) {
			return 1;
		} else if (handAType < handBType) {
			return -1;
		} else {
			for (let i = 0; i < handA.cards.length; i++) {
				if (cardsValues[handA.cards[i]] > cardsValues[handB.cards[i]]) {
					return 1;
				} else if (
					cardsValues[handA.cards[i]] < cardsValues[handB.cards[i]]
				) {
					return -1;
				}
			}
			return 1;
		}
	};

	hands.sort(sortHand);

	hands.forEach((hand, i) => {
		hand.power = i + 1;
		result += hand.value * hand.power;
	});

	return result;
};
