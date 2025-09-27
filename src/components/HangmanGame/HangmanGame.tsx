import { ImageSection } from "./ImageSection";
import { GuessWordCells } from "./GuessWordCells";
import { VirtualKeyboard } from "./VirtualKeyboard";
import { Header } from "./Header";
import { useEffect, useState } from "react";
import { useHangmanStore } from "../../store/hangmanStore";

//1:

export function HangmanGame() {
  const [statsData, setStatsData] = useState({ name: "", won: 0, lost: 0 });

  const { selectedCategory, guessWord } = useHangmanStore();

  useEffect(() => {
    const stats = localStorage.getItem("hangman");

    if (stats) {
      const parsedStats = JSON.parse(stats);

      if (parsedStats[selectedCategory]) {
        const getDataBasedOnCategories = parsedStats[selectedCategory];

        getDataBasedOnCategories && setStatsData(getDataBasedOnCategories);
      } else {
        setStatsData({ name: selectedCategory, won: 0, lost: 0 });
      }
    } else {
      setStatsData({ name: selectedCategory, won: 0, lost: 0 });
    }
  }, [selectedCategory, guessWord]);
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-800 gap-1">
      <div className="flex justify-end w-[900px]">
        <div className="bg-gray-200 px-4 py-2 rounded-md ">
          <div className="flex gap-4">
            <p>
              Category: <strong>{statsData.name}</strong>{" "}
            </p>

            <div className="flex gap-4">
              <p>Won: {statsData.won}</p>
              <p>Lost: {statsData.lost}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 p-4 rounded-md w-[900px] ">
        <div className="flex md:flex-row flex-col gap-8 w-full h-full justify-between ">
          <ImageSection />

          <div className="flex flex-2  flex-col gap-2 justify-between items-end h-full">
            <Header />
            <div className="flex flex-col gap-2">
              <GuessWordCells />
              <VirtualKeyboard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
