import React from "react";
import { cn } from "../../lib/utils";
import { useHangmanStore } from "../../store/hangmanStore";

export function GuessWordCells() {
  const { guessWord, guessedWords } = useHangmanStore();
  return (
    <div className="flex flex-wrap gap-1  border rounded-md p-2 w-[450px] justify-center bg-gray-500">
      <div className="flex gap-2">
        {guessWord.map((letter, index) => {
          return (
            <div key={letter + index} className={cn("")}>
              <p className="text-5xl text-white">
                {guessedWords[letter] === letter ? letter : "__"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
