import { useMinesweeperStore, type CellType } from "../store/minesweeperStore";
import { DIRECTIONS } from "../consts/minesweeper-consts";
import { useEffect } from "react";

export function useMinesweeperGame() {
  const {
    cellData,
    handleCellData,
    resetTimer,
    handleNewGame,
    nrOfMines,
    nrOfRows,
  } = useMinesweeperStore();

  useEffect(() => {
    boardInit();
  }, [nrOfRows]);

  function revealEmptyCells(
    boardData: CellType[][],
    selectedRow: number,
    selectedCol: number
  ) {
    const selectedCell = cellData[selectedRow][selectedCol];
    if (!selectedCell.flagged) {
      selectedCell.selected;
    }
    const queue: [number, number][] = [[selectedRow, selectedCol]];
    // if 0 cell was clicked will connect all empty cells
    //and stop at number cells

    while (queue.length > 0) {
      const [currentRow, currentCol] = queue.shift()!; //removes the lement and returns it

      const cell = boardData[currentRow][currentCol]; //extract data of current cell

      if (!cell.flagged) {
        cell.selected = true;
      } //make selected
      if (cell.number === 0) {
        //check 8 directions of that cell to see if we have more empty cells or numbers

        DIRECTIONS.forEach(([subRow, subCol]) => {
          const newRow = currentRow + subRow; //check the values of the current Row and Col
          const newCol = currentCol + subCol;

          if (
            newRow >= 0 && //to keep inside of board
            newCol >= 0 &&
            newRow < boardData.length && // ✅ use total rows
            newCol < boardData[0].length &&
            !boardData[newRow][newCol].selected && //to not open already opened
            !boardData[newRow][newCol].flagged //to avoid flagged cells
          ) {
            queue.push([newRow, newCol]);
          }
        });
      }
    }

    handleCellData(boardData);
  }

  function fillBoardWithNrAroundMines(boardCells: CellType[][]) {
    boardCells.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        //calc total amounts of mines for each cell

        if (cell.type !== "mine") {
          let minesAround = 0;
          //access 8 possible directions of each cell

          DIRECTIONS.forEach(([substractedRow, substractedCol]) => {
            // console.log(
            //   "🚀 ~ fillBoardWithNrAroundMines ~ substractedRow:",
            //   substractedRow,
            //   substractedCol
            // );
            const newRow = rowIndex + substractedRow;
            const newCol = colIndex + substractedCol;

            if (newRow in boardCells && newCol in boardCells[newRow]) {
              // to exclude checking indexes which are outside of board
              if (boardCells[newRow][newCol]?.type === "mine") {
                minesAround++; //adding how many mines are around a specific cell
              }
            }
          });
          // add the nr of mines around a cell to that iterable cell to which we found mines
          cell.number = minesAround as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
        }
      });
    });

    // from [1][1] ->cells =
    // left-> [1][0] right-> [1][2]
    // top->
    // [0][0] [0][1] [0][2]
    //  bottom-> [2][0] [2][1] [2][2]
  }

  function fillBoardWithMines(boardCells: CellType[][]) {
    let minesAdded = 0;

    while (minesAdded < nrOfMines) {
      const randomRow = Math.floor(Math.random() * nrOfRows);
      const randomCol = Math.floor(Math.random() * nrOfRows);

      if (boardCells[randomRow][randomCol].type !== "mine") {
        //if the number already exists then generate another and increase the minesAdded only when added new Mine in order to add always the desired nr!
        boardCells[randomRow][randomCol].type = "mine";
        minesAdded++;
      }
    }
  }

  function boardInit() {
    resetTimer();
    handleNewGame();
    const boardCells: CellType[][] = [];

    for (let row = 0; row < nrOfRows; row++) {
      boardCells[row] = []; //nr of rows of empty arrays

      for (let colCell = 0; colCell < nrOfRows; colCell++) {
        boardCells[row][colCell] = {
          //add col 9 col data in each row
          id: Date.now() + colCell,
          flagged: false,
          selected: false,
          type: "empty",
        };
      }
    }

    fillBoardWithMines(boardCells); //will mutate the board directly so no need to return data

    fillBoardWithNrAroundMines(boardCells); //add nr around mines

    handleCellData(boardCells); //add data to store
  }

  return { boardInit, revealEmptyCells };
}
