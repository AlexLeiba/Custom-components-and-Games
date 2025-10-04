import { Link } from "react-router-dom";
import { TimerClock } from "../components/Timer/TimerClock";

//an input type date, to pick a time for the timer
//after piced the time to count down will disable an apply button
//as long as the button is clicked (transform the selected time in seconds and count down the seconds, once the seconds are equal with 0 show an alert window) , create a function which will count down the seconds
function TimerPage() {
  return (
    <div>
      {" "}
      <Link to="/" className="text-blue-500 underline">
        Back to Home
      </Link>
      <TimerClock />
    </div>
  );
}

export default TimerPage;
