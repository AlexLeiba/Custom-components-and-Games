import { Link } from "react-router-dom";
import { Pagination } from "../components/Pagination";

function PaginationPage() {
  return (
    <div className="m-8 flex flex-col gap-10">
      {" "}
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <Pagination totalPages={100} />
    </div>
  );
}

export default PaginationPage;
