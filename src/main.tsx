import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProviderComponent } from "./context/ToastProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProviderComponent>
      <App />
    </ToastProviderComponent>
  </StrictMode>
);
