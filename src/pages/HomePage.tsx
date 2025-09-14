import { Link } from "react-router-dom";

function HomePage() {
  // ?search?q={query}

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4">
      <h1 className="text-3xl">Components and Games</h1>

      <Link to="/memory-game">
        <p>Memory game</p>
      </Link>

      <Link to="/tic-tac-toe">
        <p>Tic Tac Toe Game</p>
      </Link>

      <Link to="/toast-notification">
        <p>Toast notification </p>
      </Link>

      <Link to="/nested-recursive-messages">
        <p>Nested Recursive messages</p>
      </Link>
      <Link to="/autocomplete-input-suggestions">
        <p>Autocomplete input suggestions</p>
      </Link>
    </div>
  );
}

export default HomePage;
