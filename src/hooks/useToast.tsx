import { useEffect, useState } from "react";
import { Toast } from "../components/Toast";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utility";

export type ToastTriggerProps = {
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
  animation?: "pop" | "fade" | "slide" | "zoom";
  position?:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
};

const toastContainerPositions = cva("fixed flex-col  gap-4 p-4 z-50", {
  variants: {
    position: {
      center: "top-2 left-1/2 -translate-x-1/2 ",
      "top-left": "top-2 left-2 flex-col ",
      "top-right": "top-2 right-2 flex-col",
      "bottom-left": "bottom-2 left-2 flex-col-reverse",
      "bottom-right": "bottom-2 right-2 flex-col-reverse ",
    },
  },
});

let timerId: number; //keep outside of hook to not loose the timer Id when we add a new Toast
// This approach will keep the timerId in memory In order to Clear Timer each time we click a new Toast.

/**
 * useToast hook provides a toast notification system
 * @param {Object} params - hook options
 * @param {String} [params.position="top-right"] - position of the toast container
 * @returns {Object} - an object with `Toast` component and `triggerToast` function
 * @example
 * const { Toast, triggerToast } = useToast({
 *   position: "bottom-left",
 * });
 *
 * triggerToast({
 *   type: "success",
 *   message: "Hello World!",
 *   duration: 2000,
 *   animation: "pop",
 * });
 */
export function useToast({
  position = "top-right",
}: Pick<ToastTriggerProps, "position">) {
  const [toastData, setToastData] = useState<ToastTriggerProps[]>([]);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (duration) {
      let timerId: NodeJS.Timeout | undefined = undefined;
      for (let i = toastData.length; i > 0; i--) {
        clearTimeout(timerId); //Clear timer at each iteration

        timerId = setTimeout(() => {
          setToastData((prev) => {
            const firstElementAdded = prev[0];
            return prev.filter((data) => data !== firstElementAdded);
          });
        }, duration);
      }
    }
  }, [duration, toastData]);

  function triggerToast({
    type,
    message,
    duration = 2000,
    animation,
  }: ToastTriggerProps) {
    setToastData((prev) => {
      return [
        ...prev,
        {
          type,
          message,
          duration,
          animation,
          position,
        },
      ];
    });

    setDuration(duration);
  }

  function handleClose(index: number) {
    setToastData((prev) => prev.filter((_, i) => i !== index));
  }

  return {
    Toast: (
      <div className={cn(toastContainerPositions({ position }))}>
        {toastData.map((toast, index) => {
          return (
            <Toast
              key={index}
              {...toast}
              position={position}
              onClose={() => handleClose(index)}
            />
          );
        })}
      </div>
    ),
    triggerToast,
  };
}
