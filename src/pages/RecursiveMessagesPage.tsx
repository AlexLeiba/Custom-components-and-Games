import React from "react";
import { NestedComments } from "../components/NestedComments";
import { Link } from "react-router-dom";

function RecursiveMessagesPage() {
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <NestedComments />
    </div>
  );
}

export default RecursiveMessagesPage;
