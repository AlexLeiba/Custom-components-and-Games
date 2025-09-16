import { useEffect, useRef } from "react";

/**
 * useDebounce is a hook that provides a debounced version of a function.
 * It takes an optional delay time parameter which defaults to 1000ms.
 * The hook returns a debounced function that can be used to wrap any other function.
 * The debounced function will only be called after the delay time has expired.
 * If the debounced function is called again before the delay time has expired,
 * the previous timeout will be cleared and a new timeout will be set.
 * The hook also cleans up any active timeouts when the component is unmounted.
 * @param {number} [delayTime=1000] - the delay time in milliseconds
 * @returns {function} - the debounced function
 */
export function useDebounce(delayTime: number = 1000) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); //to store timeout in it

  function debounceFunction(callBack: () => void) {
    //When click on clallback check if the timner is set/if YES clean it and set new Timeout
    if (timeoutRef.current) {
      //means the timer was set
      clearTimeout(timeoutRef.current); //clear timer When the fn was clicked again
    }

    timeoutRef.current = setTimeout(() => {
      callBack();
    }, delayTime); //after the delay expires The callback will be clicked!
  }

  useEffect(() => {
    //on unmount clean up the timer for performance

    if (timeoutRef.current) {
      return clearTimeout(timeoutRef.current);
    }
  }, []);

  return debounceFunction;
}
