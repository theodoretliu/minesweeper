import { getRandomInt } from '$lib/foo';

interface Mine {
	type: 'mine';
}

interface Count {
	type: 'count';
	count: number;
}

export type Square = Mine | Count;

const deltas = [
	[-1, 1],
	[-1, 0],
	[-1, -1],
	[0, -1],
	[0, 1],
	[1, 1],
	[1, 0],
	[1, -1]
];

export function initBoard(): [Array<Array<Square>>, Array<Array<boolean>>] {
	let board: Array<Array<Square>> = [];
	for (let i = 0; i < 10; ++i) {
		let row: Array<Square> = [];

		for (let j = 0; j < 10; j++) {
			row.push({ type: 'count', count: 0 });
		}
		board.push(row);
	}

	// generating mine locations
	let count = 0;

	let mines: Array<[number, number]> = [];
	while (count < 10) {
		let coord;
		do {
			coord = [getRandomInt(10), getRandomInt(10)];
		} while (mines.includes(coord));

		count++;

		mines.push(coord);
	}

	// setting mines
	for (let [x, y] of mines) {
		board[x][y] = { type: 'mine' };
	}

	// getting mine counts
	for (let i = 0; i < 10; i++) {
		for (let j = 0; j < 10; j++) {
			let square = board[i][j];

			if (square.type === 'count') {
				let numMines = 0;

				for (let [deltaX, deltaY] of deltas) {
					let [newX, newY] = [i + deltaX, j + deltaY];

					if (
						0 <= newX &&
						newX < 10 &&
						0 <= newY &&
						newY < 10 &&
						board[newX][newY].type === 'mine'
					) {
						numMines++;
					}
				}
				square.count = numMines;
			}
		}
	}

	let clicked: Array<Array<boolean>> = [];

	for (let i = 0; i < 10; i++) {
		clicked.push(new Array<boolean>(10).fill(false));
	}

	return [board, clicked];
}

export function click(
	clicked: Array<Array<boolean>>,
	board: Array<Array<Square>>,
	i: number,
	j: number
) {
	if (i < 0 || i >= 10 || j < 0 || j >= 10) {
		return clicked;
	}

	if (clicked[i][j]) {
		return clicked;
	}

	let square = board[i][j];

	clicked[i][j] = true;

	if (square.type === 'mine') {
		return clicked;
	}

	if (square.type === 'count' && square.count === 0) {
		for (let [deltaX, deltaY] of deltas) {
			click(clicked, board, i + deltaX, j + deltaY);
		}
	}

	return clicked;
}
