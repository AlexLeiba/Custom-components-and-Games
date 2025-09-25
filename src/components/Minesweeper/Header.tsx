import { NumberDisplay } from "./NumberDisplay";
import { Face } from "./Face";
import { useMinesweeperStore } from "../../store/minesweeperStore";
import { useEffect, useState } from "react";

export function Header() {
  const {
    cellData,
    hasAMineExploded,
    timer,
    flaggsUsed,
    gameOver,
    clicks,
    flaggedMines,
    handleTimer,
    handleAddStatsData,
  } = useMinesweeperStore();

  const [time, setTime] = useState(0);

  useEffect(() => {
    if (hasAMineExploded || gameOver) {
      handleTimer(time);

      handleAddStatsData({
        time,
        clicks,
        type: hasAMineExploded ? "lost" : "won",
        name: "",
        mines: flaggedMines,
      });
    }
    const intervalId = setInterval(() => {
      if (!hasAMineExploded || !gameOver) {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    (hasAMineExploded || gameOver) && clearInterval(intervalId);

    return () => {
      setTime(0);
      clearInterval(intervalId);
    };
  }, [cellData, hasAMineExploded, gameOver]);

  return (
    <div className="p-2 flex gap-4 justify-between  border-t-gray-400 border-l-gray-400 border-r-white border-b-white border-3">
      {/* Nr of Flags and Mines */}
      <NumberDisplay nrData={flaggsUsed} nrOfMines={9} type="flag" />
      <Face />
      {/* Timer */}
      <NumberDisplay nrData={time || timer} type="timer" />
    </div>
  );
}
