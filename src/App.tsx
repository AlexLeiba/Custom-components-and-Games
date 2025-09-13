import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContext } from "./context/ToastProvider";
import { useContext } from "react";

function App() {
  const { Toast } = useContext(ToastContext);
  return (
    <>
      {Toast}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
