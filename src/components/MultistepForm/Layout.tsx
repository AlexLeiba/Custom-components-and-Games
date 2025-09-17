import React from "react";
import { cn } from "../../../lib/utility";
import { cva } from "class-variance-authority";
import { ChevronLeft } from "lucide-react";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  step: 1 | 2 | 3 | 4;
};

const formProgressVariants = cva(
  " h-2 bg-green-300 z-50 absolute top-4 transition-all",

  {
    variants: {
      step: { 1: "w-1/4", 2: "w-2/4", 3: "w-3/4", 4: "w-full" },
    },
  }
);
export function Layout({ children, step = 1 }: Props) {
  return (
    <div className="max-w-4xl mx-auto p-4 relative">
      {/* progres bar */}
      <div className={cn(formProgressVariants({ step }))}></div>
      <div className="w-full h-2 bg-gray-200 absolute top-4 z-10 "></div>

      <div className="flex gap-4 items-center mb-10 mt-4">
        {step > 1 && (
          <Button variant={"outline"} onClick={() => history.back()}>
            <ChevronLeft className="mr-2" /> Back
          </Button>
        )}
        <p className="text-2xl 2">Step: {step}/4</p>
      </div>

      {children}
    </div>
  );
}
