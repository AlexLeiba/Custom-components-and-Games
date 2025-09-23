import React from "react";

type Props = { nrData: number };

export function NumberDisplay({ nrData }: Props) {
  return (
    <div className="size-full bg-black text-red-800 p-1">
      <p className="text-2xl">{nrData.toString().padStart(3, "0") || "000"}</p>
    </div>
  );
}
