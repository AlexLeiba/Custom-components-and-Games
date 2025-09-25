import React from "react";
import { Header } from "./Header";
import { Body } from "./Body";
import { FooterControlButtons } from "./FooterControlButtons";
import { StatsMenu } from "./StatsMenu";

export function Minesweeper() {
  return (
    <div className="grid grid-cols-[1fr_2fr_1fr] gap-4">
      <div></div>
      <div className="w-full  bg-gray-200  flex flex-col gap-4 p-4 border-t-white border-l-white border-r-gray-400 border-b-gray-400 border-4">
        <Header />
        <Body />
        <FooterControlButtons />
      </div>
      <div>
        <StatsMenu />
      </div>
    </div>
  );
}
