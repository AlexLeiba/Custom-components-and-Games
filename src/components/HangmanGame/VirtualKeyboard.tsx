import { useHangmanStore } from "../../store/hangmanStore";
import { cn } from "../../lib/utils";

export function VirtualKeyboard() {
  const {
    alphabetKeyboardData,
    handleGuessedWords,
    guessWord,
    handleAlphabetKeyboardData,
    handleFailed,
    guessWordHint,
    failed,
    gameWon,
  } = useHangmanStore();

  function handleSelectaLetter(letter: string) {
    const clonedKeyboard = structuredClone(alphabetKeyboardData);
    const index = clonedKeyboard.findIndex((item) => item.keyName === letter);

    if (guessWord.includes(letter.toLowerCase())) {
      handleGuessedWords(letter.toLowerCase());
      clonedKeyboard[index].type = "guessed";
      handleAlphabetKeyboardData(clonedKeyboard);
    } else {
      handleFailed(1);
      clonedKeyboard[index].type = "failed";
      handleAlphabetKeyboardData(clonedKeyboard);
    }
  }

  return (
    <div className="flex flex-wrap gap-1  border rounded-md p-2  justify-center bg-gray-500">
      {alphabetKeyboardData.map((letter) => {
        return (
          <button
            disabled={!guessWordHint || failed === 6 || gameWon}
            onClick={() => handleSelectaLetter(letter.keyName)}
            className={cn(
              letter.type === "failed" && "bg-red-400",
              letter.type === "guessed" && "bg-green-400",
              letter.type === "empty" && "bg-gray-200",
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
