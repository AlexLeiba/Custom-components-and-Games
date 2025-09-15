import React, { useContext } from "react";
import { ToastContext } from "../context/ToastProvider";
import { Link } from "react-router-dom";

function ToastPage() {
  const { triggerToast } = useContext(ToastContext);
  return (
    <div>
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <button
        className="border p-2 m-2"
        onClick={() =>
          triggerToast({ message: "Success toast", type: "success" })
        }
      >
        Show Success Toast
      </button>
      <button
        className="border p-2 m-2"
        onClick={() => triggerToast({ message: "Error toast", type: "error" })}
      >
        Show Error Toast
      </button>
      <button
        className="border p-2 m-2"
        onClick={() =>
          triggerToast({ message: "Warning toast", type: "warning" })
        }
      >
        Show Warning Toast
      </button>
      <button
        className="border p-2 m-2"
        onClick={() => triggerToast({ message: "Info toast", type: "info" })}
      >
        Show Info Toast
      </button>
    </div>
  );
}

export default ToastPage;
