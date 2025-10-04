import { cn } from "../../lib/utils";
import { useHangmanStore } from "../../store/hangmanStore";

export function GuessWordCells() {
  const { guessWord, guessedWords, guessWordHint } = useHangmanStore();

  return (
    <div className="flex w-full   border rounded-md p-3  justify-center bg-gray-400 ">
      <div className="flex gap-x-3 flex-wrap justify-end">
        {guessWordHint ? (
          guessWord.map((letter, index) => {
            return (
              <div key={letter + index} className={cn("")}>
                <p className="text-5xl text-white">
                  {guessedWords[letter] === letter
                    ? letter.toUpperCase()
                    : letter === " "
                    ? " - "
                    : "__"}
                </p>
              </div>
            );
          })
        ) : (
          <div>
            <p className="text-3xl text-white">Start the game</p>
          </div>
        )}
      </div>
    </div>
  );
}
