import { NumberDisplay } from "./NumberDisplay";
import { Face } from "./Face";
import { useMinesweeperStore } from "../../store/minesweeperStore";

export function Header() {
  const { cellData } = useMinesweeperStore();

  return (
    <div className="p-2 flex gap-4 justify-between  border-t-gray-400 border-l-gray-400 border-r-white border-b-white border-3">
      {/* Nr of flags and bombs */}
      <NumberDisplay
        nrData={
          cellData.map((row) => row.filter((cell) => cell.flagged)).length
        }
      />
      <Face />
      {/* Timer */}
      <NumberDisplay nrData={0} />
    </div>
  );
}
