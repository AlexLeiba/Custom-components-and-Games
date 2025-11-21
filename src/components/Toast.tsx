import type { ToastTriggerProps } from "../hooks/useToast";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utility";
import { AlertTriangle, Check, Info, X } from "lucide-react";

const toastVariants = cva(
  " py-2 px-10 mb-2 rounded-md relative w-[300px] z-50",
  {
    variants: {
      position: {
        "top-left": " top-toast-animation",
        "top-right": " top-toast-animation",
        "bottom-left": " bottom-toast-animation",
        "bottom-right": "bottom-toast-animation",
        center: "bottom-toast-animation",
      },
      type: {
        success: "bg-green-300",
        error: "bg-red-300",
        warning: "bg-yellow-300",
        info: "bg-blue-300",
      },
    },
  }
);

const Icon = {
  success: <Check />,
  error: <Info />,
  warning: <AlertTriangle />,
  info: <Info />,
};

export function Toast({
  message,
  type,
  position,

  onClose,
}: ToastTriggerProps & {
  position:
    | "top-left"
    | "top-right"
    | "bottom-left"
    | "bottom-right"
    | "center";
} & {
  onClose: () => void;
}) {
  return (
    <div className={cn(toastVariants({ type, position }))}>
      <div className="absolute top-2 left-2">{Icon[type]}</div>

      <X onClick={onClose} className="absolute top-2 right-2 cursor-pointer" />

      <div className="line-clamp-3">{message || "Hello"}</div>
    </div>
  );
}
