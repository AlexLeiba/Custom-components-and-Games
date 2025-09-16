import React, { type ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/utility";
import { cva } from "class-variance-authority";

type Props = {
  isCurrentPage: boolean;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
} & ButtonHTMLAttributes<HTMLButtonElement>;

const cellVariants = cva(
  "bg-gray-100 border p-2 size-11 line-clamp-1 hover:opacity-70 cursor-pointer ",
  {
    variants: {
      size: {
        sm: "w-8 h-8 text-sm",
        md: "w-10 h-10 text-base",
        lg: "w-12 h-12 text-lg",
      },
      isCurrentPage: {
        true: "bg-gray-900 text-white",
        false: "",
      },
    },
  }
);
export function PaginationCell({
  isCurrentPage,
  children,
  size = "md",
  ...rest
}: Props) {
  return (
    <button {...rest} className={cn(cellVariants({ size, isCurrentPage }))}>
      {children}
    </button>
  );
}
