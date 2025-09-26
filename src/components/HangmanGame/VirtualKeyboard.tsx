import React from "react";
import { useHangmanStore } from "../../store/hangmanStore";
import { cn } from "../../lib/utils";

export function VirtualKeyboard() {
  const {
    alphabetKeyboardData,
    handleGuessedWords,
    guessWord,
    handleAlphabetKeyboardData,
    handleFailed,
  } = useHangmanStore();

  function handleSelectaLetter(letter: string) {
    if (guessWord.includes(letter)) {
      handleGuessedWords(letter);
    } else {
      handleFailed(1);
      //   const updateAlphabetData = structuredClone(alphabetKeyboardData);
      const index = alphabetKeyboardData.findIndex(
        (item) => item.keyName === letter
      );
      alphabetKeyboardData[index].type = "failed";
      handleAlphabetKeyboardData(alphabetKeyboardData);
    }
  }
  return (
    <div className="flex flex-wrap gap-1  border rounded-md p-2 w-[450px] justify-center bg-gray-500">
      {alphabetKeyboardData.map((letter) => {
        return (
          <button
            onClick={() => handleSelectaLetter(letter.keyName)}
            className={cn(
              letter.type === "failed" ? "bg-red-400" : "bg-gray-300",
              "p-4 border hover:opacity-80 cursor-pointer"
            )}
            key={letter.keyName}
          >
            {letter.keyName}
          </button>
        );
      })}
    </div>
  );
}
