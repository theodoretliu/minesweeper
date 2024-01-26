import { getRandomInt, arrayIncludesTuple } from '$lib/foo';

const NUM_MINES = 40;
const DIMENSION = 16;

export class Square {
  mine: boolean;
  status: 'not revealed' | 'revealed' | 'flagged';
  board: Board;
  i: number;
  j: number;

  constructor(board: Board, i: number, j: number) {
    this.mine = false;
    this.board = board;
    this.status = 'not revealed';
    this.i = i;
    this.j = j;
  }

  get numMineNeighbors() {
    return this.board.numMineNeighbors(this.i, this.j);
  }

  click = () => {
    this.board.click(this.i, this.j);
  };

  rightClick = () => {
    if (this.status === 'not revealed') {
      this.status = 'flagged';
    } else if (this.status === 'flagged') {
      this.status = 'not revealed';
    }
  };
}

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

export class Board {
  board: Array<Array<Square>>;

  constructor() {
    this.board = this.initBoard();
  }

  initBoard = () => {
    let board: Array<Array<Square>> = [];
    for (let i = 0; i < DIMENSION; ++i) {
      let row: Array<Square> = [];

      for (let j = 0; j < DIMENSION; j++) {
        row.push(new Square(this, i, j));
      }

      board.push(row);
    }

    // generating mine locations
    let count = 0;

    let mines: Array<[number, number]> = [];
    while (count < NUM_MINES) {
      let coord;
      do {
        coord = [getRandomInt(DIMENSION), getRandomInt(DIMENSION)];
      } while (arrayIncludesTuple(mines, coord));

      count++;

      mines.push(coord);
    }

    // setting mines
    for (let [x, y] of mines) {
      board[x][y].mine = true;
    }

    return board;
  };

  numMineNeighbors = (i: number, j: number) => {
    let count = 0;
    for (let [deltaX, deltaY] of deltas) {
      let newX = i + deltaX;
      let newY = j + deltaY;

      if (newX < 0 || newX >= this.board.length || newY < 0 || newY >= this.board[0].length) {
        continue;
      }

      if (this.board[newX][newY].mine) {
        count++;
      }
    }

    return count;
  };

  click = (i: number, j: number) => {
    if (this.status === 'won' || this.status === 'lost') {
      return;
    }

    if (i < 0 || i >= this.board.length || j < 0 || j >= this.board[0].length) {
      return;
    }

    if (this.board[i][j].status !== 'not revealed') {
      return;
    }

    this.board[i][j].status = 'revealed';

    if (this.board[i][j].mine) {
      return;
    }

    if (this.board[i][j].numMineNeighbors === 0) {
      for (let [deltaX, deltaY] of deltas) {
        this.click(i + deltaX, j + deltaY);
      }
    }

    return;
  };

  get status() {
    if (this.board.every((row) => row.every((square) => square.status === 'not revealed'))) {
      return 'not started' as const;
    }

    for (let row of this.board) {
      for (let square of row) {
        if (square.status === 'revealed' && square.mine) {
          return 'lost' as const;
        }
      }
    }

    if (
      this.board.every((row) =>
        row.every(
          (square) =>
            ((square.status === 'not revealed' || square.status === 'flagged') && square.mine) ||
            (!square.mine && square.status === 'revealed')
        )
      )
    ) {
      return 'won';
    }

    return 'playing';
  }
}
