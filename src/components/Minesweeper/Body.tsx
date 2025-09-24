import { cn } from "../../lib/utils";
import { cva } from "class-variance-authority";
import { useMinesweeperStore } from "../../store/minesweeperStore";

import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";

const numberVariants = cva("text-2xl", {
  variants: {
    number: {
      1: "text-green-800",
      2: "text-yellow-800",
      3: "text-red-800",
      4: "text-blue-800",
      5: "text-pink-800",
      6: "text-gray-800",
      7: "text-gray-800",
      8: "text-gray-800",
    },
  },
});

const bodySize = 500;

export function Body() {
  const {
    handleCellData,
    handleHasAMineExploded,
    flagged,
    cellData,
    nrOfRows,
    hasAMineExploded,
  } = useMinesweeperStore();

  const { revealEmptyCells } = useMinesweeperGame();

  function handleClickCells(indexRow: number, indexCol: number) {
    if (flagged) {
      cellData[indexRow][indexCol].flagged =
        !cellData[indexRow][indexCol].flagged;
      handleCellData(cellData);
    } else if (cellData[indexRow][indexCol].flagged) {
      return;
    } else if (cellData[indexRow][indexCol].type === "mine") {
      cellData[indexRow][indexCol].type = "exploded";
      handleCellData(cellData);
      handleHasAMineExploded(true);

      const minesweeperFaceElement = document.querySelector(
        ".minesweeperFace"
      ) as HTMLElement;
      minesweeperFaceElement.innerHTML = "😨";
    } else {
      revealEmptyCells(cellData, indexRow, indexCol);
    }
  }

  function handleRightClickAddFlag(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    indexRow: number,
    indexCol: number
  ) {
    e.preventDefault();

    cellData[indexRow][indexCol].flagged =
      !cellData[indexRow][indexCol].flagged;

    handleCellData(cellData);
  }

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
              disabled={hasAMineExploded}
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
                <p
                  className={cn(
                    hasAMineExploded ? "block" : "hidden",
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
                {cell.number}
              </p>
            </button>
          );
        });
      })}
    </div>
  );
}
