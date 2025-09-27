import React from "react";
import { cn } from "../../lib/utils";
import { useHangmanStore } from "../../store/hangmanStore";

export function GuessWordCells() {
  const { guessWord, guessedWords, guessWordHint } = useHangmanStore();
  console.log("🚀 ~ GuessWordCells ~ guessWord:", guessWord);

  return (
    <div className="flex    border rounded-md p-3  justify-center bg-gray-500 ">
      <div className="flex gap-x-3 flex-wrap justify-end">
        {guessWordHint &&
          guessWord.map((letter, index) => {
            return (
              <div key={letter + index} className={cn("")}>
                <p className="text-5xl text-white">
                  {guessedWords[letter] === letter
                    ? letter.toUpperCase()
                    : "__"}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
}
