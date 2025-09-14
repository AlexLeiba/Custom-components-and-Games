import React, { useContext, useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utility";
import { ToastContext } from "../context/ToastProvider";
const OIds: number[] = [];
const XIds: number[] = [];
let player0 = 0;
let playerX = 0;
export function TicTacToe() {
  const { triggerToast } = useContext(ToastContext);
  const squareContainerSize = 400;

  const [board, setBoard] = React.useState<{ id: number; value: string }[]>([]);
  const [rowsState] = useState(3);
  const [winner, setWinner] = useState(false);

  const prevValue = useRef("");
  const [containerSize] = React.useState(300);

  function generateInitialBoard() {
    const boardArray = [];
    for (let i = 1; i <= rowsState * rowsState; i++) {
      boardArray.push({ id: i, value: "" });
    }

    setBoard(boardArray);
  }

  useEffect(() => {
    //create a dinamic array Board based on selected nr of rows with unique id
    generateInitialBoard();
  }, [rowsState]);

  function handleChangeRows() {
    // if (board.length === 9) {
    //   return setRowsState(4);
    // }
    // setRowsState(3);
  }

  // function handleContainerSize() {
  //   // setContainerSize(size);
  //   // squareContainerSize = size;
  // }

  const WINNER_PATTERN = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9], //diagonal
    [3, 5, 7], //diagonal
    [2, 5, 8], //vertical
  ];

  function calculateWinner() {
    board.forEach((cell) => {
      if (cell.value === "O") {
        OIds.push(cell.id);
      }

      if (cell.value === "X") {
        XIds.push(cell.id);
      }
    });

    WINNER_PATTERN.map((pattern) => {
      const winnerO = pattern.every((winnerPattern) =>
        [...new Set(OIds)].includes(winnerPattern)
      );

      const winnerX = pattern.every((winnerPattern) =>
        [...new Set(XIds)].includes(winnerPattern)
      );

      if (winnerO) {
        player0++;
        setWinner(true);
        triggerToast({
          type: "success",
          message: "Player O is the winner",
          duration: 4000,
        });
      }
      if (winnerX) {
        playerX++;
        setWinner(true);
        triggerToast({
          type: "success",
          message: "Player X is the winner",
          duration: 4000,
        });
      }
    });
  }

  useEffect(() => {
    calculateWinner();
  }, [board]);

  const prevCellSelectedValue = prevValue.current;
  function handleSelectCell(cellObj: { id: number; value: string }) {
    setBoard((prev) => {
      return prev.map((cell) => {
        if (cell.id === cellObj.id && !cellObj.value) {
          if (!prevCellSelectedValue || prevCellSelectedValue === "X") {
            prevValue.current = "O"; //thanks tO useRef we can then check the prev Value selected

            // Check winner after inserting new value
            return { ...cell, value: "O" }; //first time insert X
          } else if (prevCellSelectedValue === "O") {
            prevValue.current = "X";

            // Check winner after inserting new value
            return { ...cell, value: "X" }; //first time insert X
          }
        }
        return cell;
      });
    });
  }

  function handleNewGame() {
    generateInitialBoard();
    prevValue.current = "";
    setWinner(false);
    OIds.length = 0;
    XIds.length = 0;
  }
  return (
    <div className="flex justify-center items-center h-screen flex-col gap-4">
      <h1 className="text-4xl">Tic Tac Toe</h1>
      <div className="flex gap-4">
        <div>
          <p>
            <b>Rows</b> {rowsState}
          </p>
          <button onClick={handleChangeRows} className="border">
            Change to {rowsState === 3 ? 4 : 3} rows
          </button>
        </div>
        <div>
          <p>Container size:</p>
          <input
            value={containerSize}
            type="number"
            className="border"
            // onChange={(e) =>
            //   handleContainerSize(e.target.value as unknown as number)
            // }
          />
        </div>
      </div>
      <div className="flex gap-4">
        <p>
          <b> Player-O</b> :{" "}
          <span className={cn(player0 > playerX && "text-green-500")}>
            {player0}
          </span>
        </p>
        <p>
          <b> Player-X</b> :{" "}
          <span className={cn(playerX > player0 && "text-green-500")}>
            {playerX}
          </span>
        </p>
      </div>
      <div
        style={{ width: squareContainerSize, height: squareContainerSize }}
        className={"flex flex-wrap  border justify-center items-center "}
      >
        {board.map((cell, index) => {
          return (
            <button
              disabled={winner}
              onClick={() => handleSelectCell(cell)}
              key={index}
              style={{
                width: squareContainerSize / rowsState - 1, // containerSize / 3 - 1,
                height: squareContainerSize / rowsState - 1,
              }}
              className={cn(
                cell.value === "X" && "bg-green-200",
                cell.value === "O" && "bg-red-200",
                "border hover:bg-gray-200"
              )}
            >
              <p className="text-4xl">{cell.value}</p>
            </button>
          );
        })}

        <button
          onClick={handleNewGame}
          className={cn(
            winner && "bg-green-500 text-white",
            "border rounded p-2 mt-4 w-full cursor-pointer hover:bg-green-300"
          )}
        >
          New Game
        </button>
      </div>
    </div>
  );
}
