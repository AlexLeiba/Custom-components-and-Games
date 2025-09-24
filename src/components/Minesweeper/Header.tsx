import { NumberDisplay } from "./NumberDisplay";
import { Face } from "./Face";
import { useMinesweeperStore } from "../../store/minesweeperStore";
import { useEffect, useState } from "react";

export function Header() {
  const { cellData, hasAMineExploded, timer, handleTimer } =
    useMinesweeperStore();

  const [time, setTime] = useState(0);

  const flaggsUsed = [];
  cellData.forEach((row) => {
    row.forEach((cell) => {
      if (cell.flagged) {
        flaggsUsed.push(cell.flagged);
      }
    });
  });

  useEffect(() => {
    if (hasAMineExploded) {
      handleTimer(time);
    }
    const intervalId = setInterval(() => {
      if (!hasAMineExploded) {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    hasAMineExploded && clearInterval(intervalId);

    return () => {
      setTime(0);
      clearInterval(intervalId);
    };
  }, [cellData, hasAMineExploded]);

  return (
    <div className="p-2 flex gap-4 justify-between  border-t-gray-400 border-l-gray-400 border-r-white border-b-white border-3">
      {/* Nr of Flags and Mines */}
      <NumberDisplay nrData={flaggsUsed.length} nrOfMines={9} type="flag" />
      <Face />
      {/* Timer */}
      <NumberDisplay nrData={time || timer} type="timer" />
    </div>
  );
}
