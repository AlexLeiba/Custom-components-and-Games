import React, { useEffect } from "react";
import { ImageSection } from "./ImageSection";
import { GuessWordCells } from "./GuessWordCells";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { Header } from "./Header";
import { useHangmanStore } from "../../store/hangmanStore";

//1:

export function HangmanGame() {
  const { handleGuessWord } = useHangmanStore();

  useEffect(() => {
    const wordToGuess = "bananas";
    handleGuessWord(wordToGuess.toUpperCase().split(""));
  }, [handleGuessWord]);
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800">
      <div className="bg-gray-100 p-4 rounded-md w-[900px] h-[500px]">
        <div className="flex gap-8 w-full h-full justify-between">
          <ImageSection />

          <div className="flex flex-2 flex-col justify-between items-end h-full">
            <Header />
            <div>
              <GuessWordCells />
              <VirtualKeyboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
