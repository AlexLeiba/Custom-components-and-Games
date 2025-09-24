import { useMinesweeperGame } from "../../hooks/useMinesweeperGame";

export function Face() {
  const { boardInit } = useMinesweeperGame();
  function onMouseActive(type: "down" | "up") {
    const minesweeperFaceElement = document.querySelector(
      ".minesweeperFace"
    ) as HTMLElement;
    if (type === "down") {
      minesweeperFaceElement.innerHTML = "😨";
    }
    if (type === "up") {
      minesweeperFaceElement.innerHTML = "🙂";
    }
  }
  return (
    <div>
      <button
        onMouseDown={() => onMouseActive("down")}
        onMouseUp={() => onMouseActive("up")}
        title="New Game"
        onClick={boardInit}
        className="hover:opacity-70 cursor-pointer size-10 border-2 border-t-white border-l-white border-r-gray-400 border-b-gray-400 active:border-t-gray-400 active:border-l-gray-400 active:border-r-white active:border-b-white "
      >
        <p className="text-2xl minesweeperFace">🙂 </p>
      </button>
    </div>
  );
}

// 😀😨😵😬
