import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastProviderComponent } from "./context/ToastProvider.tsx";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary
    fallback={
      <div>
        Something went wrong, Reload the page
        <button onClick={() => window.location.reload()}>Reload</button>
      </div>
    }
  >
    <StrictMode>
      <ToastProviderComponent>
        <App />
      </ToastProviderComponent>
    </StrictMode>
  </ErrorBoundary>
);
