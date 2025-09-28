import React, { useContext, useEffect } from "react";
import { Button } from "../ui/button";
import { useHangmanStore } from "../../store/hangmanStore";
import { Heart } from "lucide-react";
import { ToastContext } from "../../context/ToastProvider";
import { cn } from "../../lib/utils";

const categories = [
  "Sport",
  "Movies",
  "Animals",
  "Cartoons2000s",
  "Games",
  "Cars",
  "Countries",
  "Celebrities",
];

export function Header() {
  const { triggerToast } = useContext(ToastContext);
  const {
    failed,
    handleNewGame,
    handleSelectedCategory,
    handleGameWon,
    selectedCategory,
    categoriesData,
    guessWordHint,
    guessWord,
    guessedWords,
    gameWon,
  } = useHangmanStore();

  useEffect(() => {
    if (failed === 6) {
      triggerToast({
        message: "You lost the game",
        type: "error",
        duration: 5000,
      });

      const hangmanData = localStorage.getItem("hangman");

      if (!hangmanData) {
        localStorage.setItem(
          "hangman",
          JSON.stringify({
            [selectedCategory]: {
              name: selectedCategory,
              lost: 1,
              won: 0,
            },
          })
        );
      } else {
        const data = JSON.parse(hangmanData);

        if (!data[selectedCategory]) {
          //If category doesn exist
          data[selectedCategory] = {
            name: selectedCategory,
            lost: 1,
            won: 0,
          };
        } else {
          data[selectedCategory].lost += 1;
          data[selectedCategory].name = selectedCategory;
        }
      }
    }
  }, [failed, selectedCategory]);

  useEffect(() => {
    const areAllLettersGuessed = guessWord
      .filter((letter) => letter !== " ")
      .every((letter) => {
        return guessedWords[letter] === letter;
      });

    if (areAllLettersGuessed) {
      triggerToast({
        message: "You guessed the word, Congrats!",
        type: "success",
        duration: 5000,
      });
      handleGameWon(true);

      //   Save to local Storage
      const hangmanData = localStorage.getItem("hangman");

      if (!hangmanData) {
        localStorage.setItem(
          "hangman",
          JSON.stringify({
            [selectedCategory]: {
              name: selectedCategory,
              won: 1,
              lost: 0,
            },
          })
        );
      } else {
        const data = JSON.parse(hangmanData);

        if (!data[selectedCategory]) {
          //If category doesn exist
          data[selectedCategory] = {
            name: selectedCategory,
            won: 1,
            lost: 0,
          };
        } else {
          data[selectedCategory].won += 1;
          data[selectedCategory].name = selectedCategory;
        }
        localStorage.setItem("hangman", JSON.stringify(data));
      }
    }
  }, [guessWord, guessedWords, selectedCategory]);

  return (
    <div className="flex w-full  flex-wrap  rounded-md  justify-center">
      <div className="flex flex-col gap-4 w-full">
        <div className="flex gap-8 justify-between items-center">
          <div className="flex gap-2 items-center">
            <Heart className="text-red-500" />
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
            <Button
              className={cn(
                failed === 6 || gameWon
                  ? "bg-green-500 animate-pulse"
                  : "bg-black"
              )}
              onClick={handleNewGame}
            >
              New Game
            </Button>
          </div>
        </div>
        <div className=" w-full bg-gray-300 p-2 rounded-md flex flex-col gap-1">
          <p className="text-2xl font-bold">{categoriesData.title}</p>
          <p className="text-2xl">{guessWordHint}</p>
          {failed === 6 && (
            <p>
              The word was:{" "}
              <strong>{guessWord.join("").trim().toUpperCase()}</strong>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
