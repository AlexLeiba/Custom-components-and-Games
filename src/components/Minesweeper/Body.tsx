import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { useMinesweeperStore } from "../../store/minesweeperStore";

import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../context/ToastProvider";

const numberVariants = cva("text-3xl font-bold", {
  variants: {
    number: {
      1: "text-blue-400",
      2: "text-green-500",
      3: "text-red-700",
      4: "text-purple-800",
      5: "text-pink-800",
      6: "text-gray-600",
      7: "text-gray-700",
      8: "text-gray-800",
    },
  },
});

const bodySize = 500;

export function Body() {
  const { triggerToast } = useContext(ToastContext);
  const {
    handleCellData,
    handleHasAMineExploded,
    handleGameOver,
    handleClicks,
    flagged,
    cellData,
    nrOfRows,
    hasAMineExploded,
    gameOver,
    flaggedMines,
    nrOfMines,
  } = useMinesweeperStore();

  const { revealEmptyCells } = useMinesweeperGame();

  function onMouseActive(type: "down" | "up") {
    const minesweeperFaceElement = document.querySelector(
      ".minesweeperFace"
    ) as HTMLElement;
    if (type === "down") {
      minesweeperFaceElement.innerHTML = "😨";
    }
    if (type === "up") {
      minesweeperFaceElement.innerHTML = "🙂";
    }
  }

  // LISTENS WHEN ALL MINES ARE FLAGGED
  useEffect(() => {
    const minesweeperFaceElement = document.querySelector(
      ".minesweeperFace"
    ) as HTMLElement;
    if (flaggedMines === nrOfMines) {
      alert("YOU WIN");
      minesweeperFaceElement.innerHTML = "😎";
      handleGameOver(true);
      triggerToast({
        message: "CONGRATULATIONS!! YOU WIN",
        type: "success",
        duration: 5000,
      });
    }
  }, [flaggedMines, nrOfMines]);

  // SELECT FLAG with right click
  function handleRightClickAddFlag(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexRow: number,
    indexCol: number
  ) {
    e.preventDefault();
    handleClicks();

    if (hasAMineExploded || gameOver) return;
    cellData[indexRow][indexCol].flagged =
      !cellData[indexRow][indexCol].flagged;

    handleCellData(cellData);
  }

  // SELECT CELL
  function handleClickCells(indexRow: number, indexCol: number) {
    handleClicks();
    if (hasAMineExploded || gameOver) return;
    if (flagged) {
      cellData[indexRow][indexCol].flagged =
        !cellData[indexRow][indexCol].flagged;
      handleCellData(cellData);
    } else if (cellData[indexRow][indexCol].flagged) {
      return;
    } else if (cellData[indexRow][indexCol].type === "mine") {
      // EXPLODED A MINE
      cellData[indexRow][indexCol].type = "exploded";
      handleCellData(cellData);
      handleHasAMineExploded(true);
      const minesweeperFaceElement = document.querySelector(
        ".minesweeperFace"
      ) as HTMLElement;
      minesweeperFaceElement.innerHTML = "😵";
      triggerToast({
        message: "YOU STUMBLED ON A MINE AND DIED, TRY AGAIN!",
        type: "error",
        duration: 5000,
      });
    } else {
      revealEmptyCells(cellData, indexRow, indexCol);
    }
  }

  return (
    <div
      onMouseDown={() => onMouseActive("down")}
      onMouseUp={() => onMouseActive("up")}
      style={{ width: bodySize, height: bodySize }}
      className=" flex flex-wrap justify-center items-center size-[400px] border-3 border-t-gray-400 border-l-gray-400 border-r-white border-b-white"
    >
      {cellData.map((row, indexRow) => {
        return row.map((cell, indexCol) => {
          return (
            <button
              disabled={hasAMineExploded || gameOver}
              key={cell.id}
              style={{
                width: bodySize / nrOfRows - 1,
                height: bodySize / nrOfRows - 1,
              }}
              className={cn(
                "minesweeperBody",
                cell.selected
                  ? " border-t-gray-400 border-l-gray-400 border-r-white border-b-white"
                  : " border-t-white border-l-white border-r-gray-400 border-b-gray-400",
                " border-3 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white hover:opacity-50 cursor-pointer "
              )}
              onClick={() => handleClickCells(indexRow, indexCol)}
              onContextMenu={(e) =>
                handleRightClickAddFlag(e, indexRow, indexCol)
              }
            >
              {cell.type === "mine" && (
                <p // CHECKK IF MINE EXISTS UNDER THE FLAG
                  //if yes save it on store the indexes
                  className={cn(
                    hasAMineExploded || gameOver ? "block" : "hidden",
                    "text-xl"
                  )}
                >
                  💣
                </p>
              )}
              {cell.type === "exploded" && <p className="text-4xl"> 💥</p>}
              {cell.flagged && <p className="text-xl"> 🏴</p>}

              <p
                className={cn(
                  cell.selected ? "block" : "hidden",
                  numberVariants({ number: cell.number || 1 })
                )}
              >
                {cell.number !== 0 ? cell.number : ""}
              </p>
            </button>
          );
        });
      })}
    </div>
  );
}
