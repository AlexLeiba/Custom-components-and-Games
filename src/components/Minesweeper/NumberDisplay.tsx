import React from "react";

type Props = { nrData: number; nrOfMines?: number; type: "flag" | "timer" };

export function NumberDisplay({ nrData, nrOfMines, type }: Props) {
  return (
    <div className="size-full bg-black text-red-800 p-1 flex items-center justify-between">
      {type === "flag" && (
        <div className="size-full bg-black text-red-800 p-1 flex items-center justify-between">
          <p className="text-2xl">
            F {nrData.toString().padStart(3, "0") || "000"}
          </p>

          <p className="text-2xl">
            M {nrOfMines?.toString().padStart(3, "0") || "000"}
          </p>
        </div>
      )}

      {type === "timer" && (
        <div className="size-full bg-black text-red-800 p-1 flex items-center justify-between">
          <p className="text-2xl">
            {nrData.toString().padStart(3, "0") || "000"}
          </p>
        </div>
      )}
    </div>
  );
}
