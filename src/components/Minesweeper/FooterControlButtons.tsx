import { cn } from "../../lib/utils";
import { useMinesweeperStore } from "../../store/minesweeperStore";

export function FooterControlButtons() {
  const { flagged, toggleFlag } = useMinesweeperStore();

  const newGame = true;

  function handleSlectFlag() {
    toggleFlag();
  }
  return (
    <div className="flex justify-between gap-10">
      <button
        className={cn(
          flagged ? "bg-green-400" : "bg-yellow-100",
          "px-8 w-full border-t-white border-l-white border-r-gray-400 border-b-gray-400",
          " border-3 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white cursor-pointer"
        )}
        onClick={handleSlectFlag}
      >
        <p className="text-2xl">🏴</p>
      </button>
      <button
        className={cn(
          newGame && "bg-green-300",
          "px-8 w-full border-t-white border-l-white border-r-gray-400 border-b-gray-400",
          " border-3 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white cursor-pointer"
        )}
        // onClick={handleSlectFlag}
      >
        <p className="text-2xl">New Game</p>
      </button>
    </div>
  );
}
