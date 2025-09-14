import React, { useEffect, type FormEvent } from "react";
import { cn } from "../../lib/utility";

type BoardType = {
  id: number;
  value: number;
  visible: boolean;
  matches?: boolean;
};
export function MemoryGame() {
  const [gridRows, setGridRows] = React.useState(4);
  const [gridData, setGridData] = React.useState<BoardType[]>([]);
  const containerBoardSize = 500;

  function generateRandomNr(
    gridLength: number,
    addedNr: number[],
    cellValue: number
  ) {
    const randomNr = Math.floor(Math.random() * gridLength) + 1;

    // it will enforce to have 2 the same nr per board
    const timesRandomNrRepeats = addedNr.filter((nr) => nr === randomNr).length;

    if (timesRandomNrRepeats >= 2) {
      //already we have 2 nr of the curretn value/THEN re run the random nr to GENERATE ANOTHER ONE , until we have the correct one
      return generateRandomNr(gridLength, addedNr, cellValue);
    }
    return randomNr;
  }
  function generateGridBoard() {
    const gridGeneratedData: BoardType[] = [];
    for (let i = 1; i <= gridRows * gridRows; i++) {
      gridGeneratedData.push({
        id: i,
        value: 0,
        visible: false,
        matches: false,
      });
    }

    //   keep an objext with all added random nr to add only 2 unique nr per board

    const addedRandomNumbers: number[] = []; //keep track of added nr

    const gridAddRandomValues = gridGeneratedData.map((cell) => {
      const randomNr = generateRandomNr(
        (gridRows * gridRows) / 2,
        addedRandomNumbers,
        cell.value
      ); //will return random nr between 1 and 8.

      // By generating twice less nr that our board has
      // it will enforce to have 2 the same nr per board

      if (!cell.value) {
        addedRandomNumbers.push(randomNr);
        return {
          ...cell,
          value: randomNr,
        };
      }

      return cell;
    });

    setGridData(gridAddRandomValues);
  }
  useEffect(() => {
    generateGridBoard();
  }, [gridRows]);

  function handleApply(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget).get("grid");
    setGridRows(formData as unknown as number);
  }

  function handleSelectCell(cell: BoardType) {
    // CHANGE THE APPEARANCE OF THE CELL TO BE VSIBLE
    setGridData((prev) => {
      const visibleElements = prev.filter((data) => data.visible);

      if (visibleElements.length > 1) return prev; // if two elements are visible GO TO SECOND USESTATE; IF less then add the second one AS VISIBLE
      return prev.map((data) => {
        // cehck if two visible element are equal

        if (data.id === cell.id) {
          return {
            ...data,
            visible: !data.visible,
          };
        }

        return data;
      });
    });
  }

  //   React when we changed the cell data
  useEffect(() => {
    // COMPARE TWO ELEMENTS.
    // IF MATCHES KEEP VISIBLE, IF NOT  HIDE THEM AGAIN

    const visibleElements = gridData.filter((data) => data.visible);

    if (visibleElements.length <= 1) return;
    setTimeout(() => {
      setGridData((prev) => {
        if (
          visibleElements[0].value === visibleElements[1].value //Matches
        ) {
          console.log("MEET");
          return prev.map((data) => {
            // cehck if two visible element are equal
            if (data.visible)
              if (visibleElements[0].id === data.id) {
                return {
                  ...data,
                  visible: false,
                  matches: true,
                };
              }
            if (visibleElements[1].id === data.id) {
              return {
                ...data,
                visible: false,
                matches: true,
              };
            }

            return {
              ...data,
              visible: false, //Make them all false which arent matched
            };
          });
        } else {
          return prev.map((data) => ({ ...data, visible: false }));
        }
      });
    }, 1000);
  }, [gridData]);

  return (
    <div className="flex justify-center ">
      <div className="flex  flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold underline py-8">Memory Game</h1>
        <div className="flex gap-2">
          <form
            action=""
            onSubmit={handleApply}
            className="flex gap-2 items-end mb-4"
          >
            <label htmlFor="grid">
              <b>Grid size</b>
            </label>
            <input
              defaultValue={gridRows}
              name="grid"
              id="grid"
              className="border px-2 w-12"
              type="number"
            />
            <button
              className="border px-4 rounded-md bg-green-600 text-white cursor-pointer"
              type="submit"
            >
              Apply
            </button>
            <button
              onClick={() => generateGridBoard()}
              className="border px-4 rounded-md bg-yellow-600 text-white cursor-pointer"
              type="submit"
            >
              Reset
            </button>
          </form>
        </div>

        <div
          style={{ width: containerBoardSize, height: containerBoardSize }}
          className={" bg-gray-300 overflow-hidden flex flex-wrap"}
        >
          {gridData.map((cell) => {
            return (
              <div
                onClick={() => handleSelectCell(cell)}
                key={cell.id}
                style={{
                  width: containerBoardSize / gridRows,
                  height: containerBoardSize / gridRows,
                }}
                className={cn(
                  "border flex justify-center items-center hover:bg-gray-400 cursor-pointer select-none"
                )}
              >
                <p
                  className={cn(
                    cell.matches ? "text-green-600" : "text-black",
                    cell.visible || cell.matches
                      ? "block text-4xl"
                      : "text-4xl hidden"
                  )}
                >
                  {cell.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
