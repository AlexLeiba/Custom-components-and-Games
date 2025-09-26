import React from "react";
import { Button } from "../ui/button";
import { useHangmanStore } from "../../store/hangmanStore";

const categories = ["Sport", "Movies", "Animals", "Countries", "Celebrities"];

export function Header() {
  const {
    failed,
    handleNewGame,
    handleSelectedCategory,
    selectedCategory,
    categoriesData,
  } = useHangmanStore();
  console.log("🚀 ~ Header ~ categoriesData:", categoriesData);

  return (
    <div className="flex flex-wrap  rounded-md  w-[450px] justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex gap-8 justify-between items-center">
          <div>
            <p className="text-2xl">{failed}/6</p>
          </div>

          <div className="flex gap-4">
            <select
              name="changeCategory"
              value={selectedCategory}
              onChange={(e) => handleSelectedCategory(e.target.value)}
            >
              {categories.map((category) => {
                return (
                  <option key={category} value={category}>
                    {category}
                  </option>
                );
              })}
            </select>
            <Button onClick={handleNewGame}>New Game</Button>
          </div>
        </div>
        <div className=" bg-gray-300 p-2 rounded-md">
          <p className="text-2xl">
            Here is the guess word hint Here is the guess word hint
          </p>
        </div>
      </div>
    </div>
  );
}
