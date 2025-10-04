import { QuizHeader } from "./QuizHeader";
import { QuizVariants } from "./QuizVariants";
// PSEUDOCODE

// 1:Create

export function QuizGame() {
  return (
    <div className="flex justify-center items-center w-screen h-screen bg-gray-600 flex-col gap-2">
      <QuizHeader />
      <div className="p-8 bg-gray-400 rounded-md w-[900px] ">
        <QuizVariants />
      </div>
    </div>
  );
}
