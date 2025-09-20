import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";

const defaultTimeObj = new Date(`1970-01-01T00:00:00`);
const defaultTimeObjStartTime = new Date(`1970-01-01T00:00:00`);
const defaultTimeString = "00:00:00";

export function TimerClock() {
  const [time, setTime] = useState(defaultTimeString);
  const [dateObj, setDateObj] = useState<Date>(defaultTimeObj);
  const [pause, setPause] = useState(false);
  const [startTime, setStartTime] = useState<Date>(defaultTimeObjStartTime);
  const [percentageElapsed, setPercentageElapsed] = useState(0);

  function handleApplyTimer() {
    const timeObj = new Date(`1970-01-01T${time}`);
    const startTimeObj = new Date(`1970-01-01T${time}`);
    setDateObj(timeObj);
    setStartTime(startTimeObj);
  }

  function getPercentageBetweenTime() {
    const duration = startTime.getTime() - defaultTimeObj.getTime();
    const elapsed = dateObj.getTime() - defaultTimeObj.getTime();

    setPercentageElapsed((elapsed / duration) * 100);
  }

  useEffect(() => {
    if (
      dateObj.getSeconds() > 0 ||
      dateObj.getHours() > 0 ||
      dateObj.getMinutes() > 0
    ) {
      const intervalId = setInterval(() => {
        if (!pause) {
          dateObj.setSeconds(dateObj.getSeconds() - 1); //set seconds each 1 sec
        }

        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const seconds = dateObj.getSeconds();

        setTime(
          `${hours < 10 ? "0" + hours : hours}:${
            minutes < 10 ? "0" + minutes : minutes
          }:${seconds < 10 ? "0" + seconds : seconds}`
        );

        getPercentageBetweenTime();
        if (
          dateObj.getSeconds() === 0 &&
          dateObj.getHours() === 0 &&
          dateObj.getMinutes() === 0
        ) {
          setDateObj(defaultTimeObj);
          setTime(defaultTimeString);
          alert("The timer is up!");
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [dateObj, pause, startTime]);

  function handleClear() {
    setTime(defaultTimeString);
    setDateObj(defaultTimeObj);
    setPause(false);
    setPercentageElapsed(0);
  }

  function handlePause() {
    setPause((prev) => !prev);
  }

  return (
    <div className="p-2 flex flex-col gap-4">
      <h1 className="text-2xl">Timer</h1>

      <div>
        <input
          style={{
            background: `linear-gradient(to right,#05df72 ${
              percentageElapsed - 20
            }% , transparent ${percentageElapsed}%,transparent 50%, transparent 10%)`,
          }}
          className="border p-2 rounded-md bg-green-400 "
          value={time}
          onChange={(e) => setTime(e.target.value)}
          type="time"
          name="timer"
          id="timer"
          step={"1"}
        />
      </div>
      <p>Timer: {time}</p>

      <div className="flex gap-4">
        <Button
          disabled={
            dateObj.getSeconds() > 0 ||
            dateObj.getHours() > 0 ||
            dateObj.getMinutes() > 0
          }
          onClick={handleApplyTimer}
        >
          Start
        </Button>
        <Button variant={"destructive"} onClick={handleClear}>
          Reset
        </Button>
        <Button variant={"secondary"} onClick={handlePause}>
          {pause ? "Resume" : "Pause"}
        </Button>
      </div>
    </div>
  );
}
