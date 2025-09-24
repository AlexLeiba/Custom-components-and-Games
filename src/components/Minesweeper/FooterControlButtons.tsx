import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";
import { cn } from "../../lib/utils";
import { useMinesweeperStore } from "../../store/minesweeperStore";

export function FooterControlButtons() {
  const { flagged, toggleFlag, hasAMineExploded } = useMinesweeperStore();
  const { boardInit } = useMinesweeperGame();

  function handleSlectFlag() {
    toggleFlag();
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
    <div className="flex justify-between gap-10">
      <button
        disabled={hasAMineExploded}
        className={cn(
          flagged ? "bg-green-400" : "bg-yellow-50",
          "px-8 w-full border-t-white border-l-white border-r-gray-400 border-b-gray-400",
          " border-3 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white cursor-pointer"
        )}
        onClick={handleSlectFlag}
      >
        <p className="text-2xl">🏴</p>
      </button>
      <button
        onMouseDown={() => onMouseActive("down")}
        onMouseUp={() => onMouseActive("up")}
        className={cn(
          hasAMineExploded && "bg-green-300",
          "px-8 w-full border-t-white border-l-white border-r-gray-400 border-b-gray-400",
          " border-3 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white cursor-pointer"
        )}
        onClick={boardInit}
      >
        <p className="text-2xl">New Game</p>
      </button>
    </div>
  );
}
