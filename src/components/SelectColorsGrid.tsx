import React, { useEffect, useMemo, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type SelectedColorsCellsType = {
  id: number;
  selected: boolean;
  updatedAt: number;
};
const initialNrOfRows = 3;
const squareSize = 500;

export function SelectColorsGrid() {
  const [nrOfRows, setNrOfRows] = React.useState(initialNrOfRows);
  const [cellData, setCellData] = useState<SelectedColorsCellsType[]>([]);

  const [rows, setRows] = useState(initialNrOfRows);

  function generateCellsArray(newRows?: number) {
    const cells = [];

    if (!newRows) {
      for (let i = 1; i <= nrOfRows * nrOfRows; i++) {
        cells.push({
          id: Date.now() + i,
          selected: false,
          updatedAt: Date.now(),
        });
      }
    } else {
      for (let i = 1; i <= newRows * newRows; i++) {
        cells.push({
          id: Date.now() + i,
          selected: false,
          updatedAt: Date.now(),
        });
      }
      setNrOfRows(newRows);
    }

    setCellData(cells);
  }
  useEffect(() => {
    generateCellsArray();
  }, [nrOfRows, setNrOfRows]);

  function handleApplyRows() {
    generateCellsArray(rows);
  }

  const selectedElementsIdsInOrder = useMemo(() => {
    const ids: number[] = [];

    return ids;
  }, []);
  function hanleSelectCell(id: number) {
    selectedElementsIdsInOrder.push(id);

    setCellData((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          return { ...data, selected: true, updatedAt: Date.now() };
        }
        return data;
      });
    });

    selectedElementsIdsInOrder.length === cellData.length &&
      deselectAllSelectedCells();
  }

  function deselectAllSelectedCells() {
    let index = 0;

    const intervalId = setInterval(() => {
      if (index < selectedElementsIdsInOrder.length) {
        const cellId = selectedElementsIdsInOrder[index];
        handleDeselectCell(cellId);
        index++;
      } else {
        clearInterval(intervalId); //once the index has the same length as the iterable array the inteval will stop
      }
    }, 500);
  }

  function handleDeselectCell(id: number) {
    setCellData((prev) => {
      return prev.map((data) => {
        if (data.id === id) {
          return { ...data, selected: false };
        }
        return data;
      });
    });
  }

  return (
    <div className="flex flex-col justify-center items-center w-full gap-4">
      <strong>How it works?</strong>
      <p>
        Select all cells and they will deselect in order you have selected them
      </p>

      <div className="flex gap-4">
        <input
          onChange={(e) => setRows(e.target.value as unknown as number)}
          className="border p-2"
          type="number"
          placeholder="change nr. of rows.."
        />
        <Button onClick={handleApplyRows}>Apply new rows</Button>
      </div>
      <div
        style={{ width: squareSize, height: squareSize }}
        className=" border flex flex-wrap justify-start items-start"
      >
        {cellData.map((cell) => {
          return (
            <button
              disabled={cell.selected}
              key={cell.id}
              onClick={() => hanleSelectCell(cell.id)}
              className={cn(
                cell.selected ? "bg-green-400" : "bg-gray-300",
                "border cursor-pointer hover:opacity-80"
              )}
              style={{
                width: squareSize / nrOfRows - 1,
                height: squareSize / nrOfRows - 1,
              }}
            ></button>
          );
        })}
      </div>
    </div>
  );
}
