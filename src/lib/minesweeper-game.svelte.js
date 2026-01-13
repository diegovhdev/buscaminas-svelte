import { gameInfo } from "./game-info.svelte";

const createCell = (row, col) => {
  return {
    value: 0,
    row,
    col,
    state: "unopened",
    starter: false,
  };
};

export class MinesweeperGame {
  cells = $state([]);

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;

    for (let i = 1; i <= rows; i++) {
      for (let j = 1; j <= cols; j++) {
        this.cells.push(createCell(i, j));
      }
    }
  }

  startGame(startingCell) {
    startingCell.starter = true;
    const surroundingCells = this.#getSurroundingCells(startingCell);
    surroundingCells.forEach((cell) => (cell.starter = true));
    this.#addMines();
    this.#addNumbers();
    this.play(startingCell);
  }

  play(cell) {
    if (cell.value === -1) {
      gameInfo.hasLost = true;
    } else if (cell.value === 0) {
      this.#openCellsWithoutMines(cell);
    } else {
      cell.state = "opened";
    }
  }

  #openCellsWithoutMines(cell) {
    const cellsToOpen = [cell];

    while (cellsToOpen.length > 0) {
      const currentCell = cellsToOpen.shift();
      currentCell.state = "opened";

      if (currentCell.value !== 0) continue;
      cellsToOpen.push(
        ...this.#getSurroundingCells(currentCell).filter(
          (cell) => cell.value !== -1 && cell.state !== "opened"
        )
      );
    }
  }

  #getSurroundingCells(cell) {
    const surroundingCells = [
      { row: -1, col: -1 },
      { row: 0, col: -1 },
      { row: 1, col: -1 },
      { row: 1, col: 0 },
      { row: 1, col: 1 },
      { row: 0, col: 1 },
      { row: -1, col: 1 },
      { row: -1, col: 0 },
    ];

    const newSurroundingCells = surroundingCells
      .map(({ row, col }) => {
        return {
          row: row + cell.row,
          col: col + cell.col,
        };
      })
      .filter(({ row, col }) => {
        if (row < 1 || row > this.rows || col < 1 || col > this.cols) {
          return false;
        }
        return true;
      })
      .map(({ row, col }) => this.#findCell(row, col));

    return newSurroundingCells;
  }

  #findCell(row, col) {
    const index = (row - 1) * this.cols + col - 1;
    return this.cells[index];
  }

  #addMines() {
    let numberOfMines = Math.floor(this.cols * this.rows * 0.16);

    while (numberOfMines > 0) {
      const randomRow = Math.floor(Math.random() * this.rows) + 1;
      const randomCol = Math.floor(Math.random() * this.cols) + 1;
      const currentCell = this.#findCell(randomRow, randomCol);

      if (currentCell.value !== -1 && !currentCell.starter) {
        currentCell.value = -1;
        numberOfMines--;
      }
    }
  }

  #addNumbers() {
    for (let row = 1; row <= this.rows; row++) {
      for (let col = 1; col <= this.cols; col++) {
        const currentCell = this.#findCell(row, col);

        if (currentCell.value === -1) continue;

        const surroundingCells = this.#getSurroundingCells(currentCell);
        currentCell.value = surroundingCells.reduce((value, cell) => {
          return cell.value === -1 ? value + 1 : value;
        }, 0);
      }
    }
  }
}
