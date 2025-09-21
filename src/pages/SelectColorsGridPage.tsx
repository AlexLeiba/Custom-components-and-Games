import React from "react";
import { Link } from "react-router-dom";
import { SelectColorsGrid } from "../components/SelectColorsGrid";

function SelectColorsGridPage() {
  return (
    <div className="p-4">
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>

      <SelectColorsGrid />
    </div>
  );
}

export default SelectColorsGridPage;
