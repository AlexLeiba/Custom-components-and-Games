import { Link } from "react-router-dom";
import { MemoryGame } from "../components/MemoryGame";

function MemoryGamePage() {
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <MemoryGame />
    </div>
  );
}

export default MemoryGamePage;
