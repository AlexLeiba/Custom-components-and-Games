import React from "react";
import { Link } from "react-router-dom";
import { Minesweeper } from "../components/Minesweeper/Minesweeper";

function MinesweeperPage() {
  return (
    <div className="w-screen h-screen bg-gray-800">
      <div className="flex h-full items-center justify-center">
        <Link to="/" className="text-blue-500 underline absolute top-4">
          Back to Home
        </Link>

        <Minesweeper />
      </div>
    </div>
  );
}

export default MinesweeperPage;
