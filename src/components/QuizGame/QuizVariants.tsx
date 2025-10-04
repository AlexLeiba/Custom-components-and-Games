import { useEffect, useState } from "react";
import { useQuizStore } from "../../store/quizStore";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

export function QuizVariants() {
  const [selectedVariant, setSelectedVariant] = useState("");
  const [isSelectedTrue, setIsSelectedTrue] = useState(false);

  const {
    currentQuizData,
    currentQuiz,
    handleQuizData,
    handleNextQuiz,
    quizData,
    handleNewGame,
  } = useQuizStore();

  useEffect(() => {
    handleQuizData();
    setIsSelectedTrue(false);
    setSelectedVariant("");
  }, [currentQuiz, setIsSelectedTrue, handleQuizData]);

  function handleSelectVariant(variant: string) {
    console.log(
      "🚀 ~ handleSelectVariant ~ variant:",
      variant,
      currentQuizData.word
    );
    setSelectedVariant(variant);
    if (variant.toLowerCase() === currentQuizData.word.toLowerCase()) {
      return setIsSelectedTrue(true);
    }
    setIsSelectedTrue(false);
  }

  function goToNextQuiz() {
    handleNextQuiz(isSelectedTrue);
  }

  return (
    <div className="flex flex-col items-center gap-8 ">
      <p className="text-3xl mb-4">{currentQuizData.question}</p>
      <div className="grid grid-cols-[repeat(2,1fr)] gap-4">
        {currentQuizData.variants.map((variant) => {
          return (
            <button
              disabled={!!selectedVariant}
              onClick={() => handleSelectVariant(variant)}
              key={variant}
              className={cn(
                "rounded-md p-4 hover:opacity-80 cursor-pointer min-w-[300px]",
                isSelectedTrue && selectedVariant === variant && "bg-green-400",
                !isSelectedTrue && selectedVariant === variant && "bg-red-600",
                !isSelectedTrue &&
                  selectedVariant &&
                  variant === currentQuizData.word &&
                  "border-6 border-green-500",
                (!selectedVariant || selectedVariant) !== variant &&
                  "bg-gray-100"
              )}
            >
              <p className="text-3xl">{variant}</p>
            </button>
          );
        })}
      </div>
      {selectedVariant && (
        <>
          {quizData.length > currentQuiz + 1 ? (
            <div className="flex justify-end w-full">
              <Button
                onClick={goToNextQuiz}
                size={"lg"}
                className="cursor-pointer"
              >
                <p className="text-xl">New Game</p>
                <ChevronRight />
              </Button>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <Button
                variant={"secondary"}
                onClick={handleNewGame}
                size={"lg"}
                className="cursor-pointer"
              >
                <p className="text-3xl">New Game</p>
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
