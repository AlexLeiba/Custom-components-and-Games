import { TicTacToe } from "../components/TicTacToe";
import { Link } from "react-router-dom";

function TicTacToePage() {
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <h1 className="text-2xl font-bold">Tic Tac Toe Game</h1>
      <TicTacToe />
    </div>
  );
}

export default TicTacToePage;
