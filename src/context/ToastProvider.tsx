import { createContext } from "react";
import { useToast, type ToastTriggerProps } from "../hooks/useToast";

// eslint-disable-next-line react-refresh/only-export-components
export const ToastContext = createContext<{
  Toast: React.ReactNode;
  triggerToast: (props: ToastTriggerProps) => void;
}>({
  Toast: null,
  triggerToast: () => {},
});

export function ToastProviderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Toast, triggerToast } = useToast({ position: "center" });

  return (
    <ToastContext.Provider value={{ triggerToast, Toast }}>
      {children}
    </ToastContext.Provider>
  );
}
