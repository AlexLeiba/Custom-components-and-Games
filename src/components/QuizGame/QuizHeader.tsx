import React from "react";
import { useQuizStore } from "../../store/quizStore";

export function QuizHeader() {
  const { quizData, currentQuiz, gameStats } = useQuizStore();
  return (
    <div className="px-4 py-2 bg-gray-200 rounded-md w-[900px]">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl">Quiz Game</h1>

        <div>
          <p className="text-2xl">
            Quiz: {currentQuiz + 1 + "/" + quizData.length}
          </p>
        </div>

        <div className="flex gap-4">
          <p className="text-xl">
            <strong>Won: </strong>
            {gameStats.won}
          </p>
          <p className="text-xl">
            <strong>Lost: </strong>
            {gameStats.lost}
          </p>
        </div>
      </div>
    </div>
  );
}
