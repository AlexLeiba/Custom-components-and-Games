import { useContext } from "react";
import { useDebounce } from "../hooks/useDebounce";
import { useThrottle } from "../hooks/useThrottle";
import { Link } from "react-router-dom";
import { ToastContext } from "../context/ToastProvider";

function CustomHooksPage() {
  const { triggerToast } = useContext(ToastContext);
  const debounce = useDebounce();
  const debounce5Sec = useDebounce(5000);
  const throttle = useThrottle();
  const throttle4Sec = useThrottle(5000);

  return (
    <div className="flex flex-col gap-8">
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <button
        className="border p-2"
        onClick={() =>
          debounce(() => {
            triggerToast({
              message: "Debounced the function after 2 sec",
              type: "info",
            });
          })
        }
      >
        Debounce/Delay the execution 2 sec
      </button>
      <button
        className="border p-2"
        onClick={() =>
          debounce5Sec(() => {
            triggerToast({
              message: "Debounced the function after 5 sec",
              type: "info",
            });
          })
        }
      >
        Debounce/Delay the execution 5 sec
      </button>
      <button
        className="border p-2"
        onClick={() =>
          throttle(() => {
            triggerToast({
              message: "Throttle the function each 1 sec",
              type: "info",
            });
          })
        }
      >
        Throttle/Execute not more often than every 1 sec
      </button>
      <button
        className="border p-2"
        onClick={() =>
          throttle4Sec(() => {
            triggerToast({
              message: "Throttle the function each 5 sec",
              type: "info",
            });
          })
        }
      >
        Throttle/Execute not more often than every 5 sec
      </button>
    </div>
  );
}

export default CustomHooksPage;
