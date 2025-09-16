/**
 * useThrottle hook is used to limit the number of times a function can be called within a certain time period.
 * It takes a single argument, throttleTime, which is the time period in milliseconds.
 * The function returns a new function, throttleHandler, which can be called in place of the original function.
 * ThrottleHandler will only call the original function if the time since the last call is greater than or equal to the throttleTime.
 * @example
 * const throttleClick = useThrottle(1000);
 * const handleClick = () => console.log("clicked");
 * throttleClick(handleClick);
 */
let lastTimeWasClicked = 0; //kept outside to not lose the value at each execution
export function useThrottle(throttleTime: number = 1000) {
  //to call a fn not  more aften than x times

  function throttleHandler(callback: () => void) {
    const currentTime = Date.now();

    if (lastTimeWasClicked + throttleTime < currentTime) {
      //The Callback wont be called unless the currentTime + throttleTime is smaller than Present Time
      lastTimeWasClicked = currentTime;

      callback();
    }
  }
  return throttleHandler;
}
