import { cn } from "../../../../lib/utils";
import React from "react";

type Props = {
  title: string;
  color: string;
  size?: "sm" | "md" | "lg";
};
export function Button({ title = "Button", color, size, ...props }: Props) {
  return (
    <button {...props} className={"p-4"} style={{ backgroundColor: color }}>
      {title}
    </button>
  );
}
