import React, { useRef } from "react";
import { cn } from "../../lib/utils";

// Store intervalId outside the function so we can clear it

export function CoordsTests() {
  // const [mouseCoords, setMouseCoords] = React.useState({ x: 0, y: 0 });
  const [dataCoords, setDataCoords] = React.useState([{ x: 0, y: 0 }]);
  const [distanceBetweenPoints, setDistanceBetweenPoints] = React.useState(0);

  const elementRef = useRef<HTMLDivElement>(null);

  const [selectedPoint, setSelectedPoint] = React.useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  // const [elementToMoveCoords, setElementToMoveCoords] = React.useState({/src/components/logic-tests/CoordsTests.tsx/src/components/logic-tests/CoordsTests.tsx
  //   x: 200,
  //   y: 200,
  // });
  // const [element2ToMoveCoords, setElement2ToMoveCoords] = React.useState({
  //   x: 500,
  //   y: 0,
  // });

  function calcDistanceBetweenPoints() {
    // (x1 - x2)power2 + (y1 - y2)power2 =   square root (radical) /

    // const distance =
    //   (selectedPoint.x2 - selectedPoint.x1) * 2 +
    //   (selectedPoint.y2 - selectedPoint.y1) * 2;

    // const squareRootOfdistance = Math.floor(Math.sqrt(distance));
    const squareRootOfdistance = Math.round(
      Math.hypot(
        selectedPoint.x2 - selectedPoint.x1,
        selectedPoint.y2 - selectedPoint.y1,
      ),
    );
    setDistanceBetweenPoints(squareRootOfdistance);
  }
  function handleSelectPoints({ x, y }: { x: number; y: number }) {
    setSelectedPoint((prev) => {
      // If first point wasnt selectd
      if (prev.x1 === 0 && prev.y1 === 0) {
        return { x1: x, y1: y, x2: 0, y2: 0 };
      }

      // IF SELECTING TWICE THE SAME POINT- DESELECT
      if (prev.x1 === x && prev.y1 === y) {
        return { x1: 0, y1: 0, x2: 0, y2: 0 };
      }

      // SET SECOND POINT
      calcDistanceBetweenPoints();
      return { x1: prev.x1, y1: prev.y1, x2: x, y2: y };
    });
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const elementSize = elementRef.current?.getBoundingClientRect();
    if (!elementSize) return;

    setDataCoords((prev) => {
      const coordCanvasX = e.clientX - (elementSize?.width || 0) / 2; //to center the element in the center of pointer
      const coordCanvasY = e.clientY - (elementSize?.height || 0) / 2; //by default elements are targeted from top left corner ( by substracting half of element width and height this way we will move element to center of pointer)
      console.log("🚀 ~ handleClick ~ e.clientX:", e.clientX, e.clientY);

      // check for existing in the same coords
      // check if around the elements exists something
      // if (!elementSize?.width && !elementSize?.height) {
      //   return prev;
      // }

      // check if an element occupies the same space coords
      // x=100 y=200 width=50 height=50
      // check if any added new element can overlap the element
      // oldE-y > newE-y
      //  oldE-x > newE-x
      //oldE-y + oldEHeight
      const coordExists = prev.find(
        (coord) =>
          coord.x + elementSize?.width > coordCanvasX && //on right side of element
          coord.x - elementSize?.width < coordCanvasX && //on left same if is enough space
          coord.y + elementSize?.height > coordCanvasY &&
          coord.y - elementSize?.height < coordCanvasY,
      );

      if (coordExists) return prev;

      return [
        ...prev,
        {
          x: coordCanvasX,
          y: coordCanvasY,
        },
      ];
    });
  }

  //   function handleMove(
  //     type: "up" | "down" | "left" | "right",
  //     trigger: boolean,
  //   ) {
  //     console.log("Mouse");
  //
  //     if (trigger) {
  //       moveInterval = setInterval(() => {
  //         setElementToMoveCoords((prev) => {
  //           switch (type) {
  //             case "up":
  //               return { ...prev, y: prev.y - 10 };
  //             case "down":
  //               return { ...prev, y: prev.y + 10 };
  //             case "left":
  //               return { ...prev, x: prev.x - 10 };
  //             case "right":
  //               return { ...prev, x: prev.x + 10 };
  //             default:
  //               return prev;
  //           }
  //         });
  //       }, 10);
  //     }
  //     if (!trigger) {
  //       console.log("🚀 ~ handleMove ~ trigger:", trigger);
  //       clearInterval(moveInterval);
  //     }
  //   }
  return (
    <div
      // onPointerMove={(e) =>
      //   setMouseCoords({
      //     x: e.clientX - (elementSize?.width || 0) / 2,
      //     y: e.clientY - (elementSize?.height || 0) / 2,
      //   })
      // }
      onClick={handleClick}
      className="bg-amber-200 h-screen relative w-screen"
    >
      {dataCoords.map((coord, index) => {
        return (
          <div
            onClick={() => handleSelectPoints(coord)}
            ref={elementRef}
            style={{
              opacity: coord.x === 0 ? 0 : 1,
              transform: `translateX(${coord.x}px) translateY(${coord.y}px)`,
            }}
            className={cn(
              selectedPoint.x1 === coord.x && selectedPoint.y1 === coord.y
                ? "bg-black text-white"
                : selectedPoint.x2 === coord.x && selectedPoint.y2 === coord.y
                  ? "bg-yellow-400 text-black"
                  : "bg-green-400 text-black",
              " size-8 rounded-full flex justify-center items-center  absolute cursor-pointer",
            )}
          >
            {index + 1}
          </div>
        );
      })}

      <div className=" absolute top-0 left-1/2  -translate-x-1/2">
        <div className="flex gap-4 items-center">
          <div
            className={
              "p-2 rounded-full justify-center items-center flex  cursor-grab bg-black text-white"
            }
          >
            From pointer A
          </div>
          <p>{distanceBetweenPoints}</p>
          <div
            className={
              "p-2 rounded-full justify-center items-center flex  cursor-grab bg-yellow-500 text-white"
            }
          >
            To point B
          </div>
        </div>
        <p className="text-2xl">{}</p>
      </div>
      {/* <div
        ref={elementRef}
        className="size-20 border border-black rounded-full"
        style={{
          transform: `translateX(${mouseCoords.x}px) translateY(${mouseCoords.y}px)`,
        }}
      ></div> */}
      {/* <div
        style={{
          transform: `translateX(${elementToMoveCoords.x}px) translateY(${elementToMoveCoords.y}px) `,
        }}
        className="p-2 bg-black w-20 text-white transition-all"
      >
        To move
      </div> */}
      {/* <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
        <Button
          onPointerDown={() => handleMove("up", true)}
          onPointerUp={() => handleMove("up", false)}
        >
          Up
        </Button>
        <Button
          onPointerUp={() => handleMove("down", false)}
          onPointerDown={() => handleMove("down", true)}
        >
          down
        </Button>
        <Button
          onPointerUp={() => handleMove("left", false)}
          onPointerDown={() => handleMove("left", true)}
        >
          left
        </Button>
        <Button
          onPointerUp={() => handleMove("right", false)}
          onPointerDown={() => handleMove("right", true)}
        >
          right
        </Button>
      </div> */}
    </div>
  );
}
