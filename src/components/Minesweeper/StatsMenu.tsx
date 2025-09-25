import React from "react";
import { useMinesweeperStore } from "../../store/minesweeperStore";

export function StatsMenu() {
  const { gameStatsData } = useMinesweeperStore();
  console.log("🚀 ~ StatsMenu ~ gameStatsData:", gameStatsData);
  return (
    <div className="border-t-gray-400 border-l-gray-400 border-r-white border-b-white p-2 bg-gray-100 border-4">
      <p className="text-2xl">Game stats</p>
      <div className="flex flex-col gap-2">
        {gameStatsData.map((gameStats, index) => {
          return (
            <div
              key={gameStats.name + index}
              className="border-t-gray-400 border-l-gray-400 border-r-white border-b-white p-2 bg-gray-100 border-4"
            >
              <p>{gameStats.name}</p>
              <p className="text-lg">
                Found mines:
                <span className="text-sm"> {gameStats.mines} </span>
              </p>
              <p className="text-lg">
                Time: <span className="text-sm">{gameStats.time} sec.</span>
              </p>
              <p className="text-lg">
                Clicks: <span className="text-sm">{gameStats.clicks}</span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
