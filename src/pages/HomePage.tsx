import { Link } from "react-router-dom";

function HomePage() {
  const PAGES_ROUTES = [
    {
      path: "/memory-game",
      title: "Memory Game",
    },
    {
      path: "/tic-tac-toe",
      title: "Tic Tac Toe",
    },
    {
      path: "/toast-notification",
      title: "Toast Notification",
    },
    {
      path: "/nested-recursive-messages",
      title: "Nested Recursive Messages",
    },
    {
      path: "/autocomplete-input-suggestions",
      title: "Autocomplete Input Suggestions",
    },
    {
      path: "/file-explorer",
      title: "File Explorer",
    },
    {
      path: "/pagination",
      title: "Pagination Reusable Component",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen items-center justify-center gap-4">
      <h1 className="text-3xl">Components and Games</h1>

      {PAGES_ROUTES.map(({ path, title }) => (
        <Link key={path} to={path}>
          <p className="text-lg">{title}</p>
        </Link>
      ))}
    </div>
  );
}

export default HomePage;
