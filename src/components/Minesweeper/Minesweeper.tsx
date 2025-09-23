import React from "react";
import { Header } from "./Header";
import { Body } from "./Body";
import { FooterControlButtons } from "./FooterControlButtons";

export function Minesweeper() {
  return (
    <div className="bg-gray-200  flex flex-col gap-4 p-4 border-t-white border-l-white border-r-gray-400 border-b-gray-400 border-4">
      <Header />
      <Body />
      <FooterControlButtons />
    </div>
  );
}
