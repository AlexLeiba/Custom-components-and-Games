import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import { ToastContext } from "./context/ToastProvider";
import { useContext } from "react";
import ToastPage from "./pages/ToastPage";
import AutocompletePage from "./pages/AutocompletePage";
import MemoryGamePage from "./pages/MemoryGamePage";
import RecursiveMessagesPage from "./pages/RecursiveMessagesPage";
import TicTacToePage from "./pages/TicTacToePage";
import FileExplorer from "./pages/FileExplorer";
import PaginationPage from "./pages/PaginationPage";
import CustomHooksPage from "./pages/CustomHooksPage";
import FirstStep from "./pages/MultistepForm/FirstStep";
import SecondStep from "./pages/MultistepForm/SecondStep";
import ThirdStep from "./pages/MultistepForm/ThirdStep";
import ForthStep from "./pages/MultistepForm/ForthStep";
import TimerPage from "./pages/TimerPage";

function App() {
  const { Toast } = useContext(ToastContext);
  return (
    <>
      {Toast}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/toast-notification" element={<ToastPage />} />
          <Route
            path="/autocomplete-input-suggestions"
            element={<AutocompletePage />}
          />
          <Route path="/memory-game" element={<MemoryGamePage />} />
          <Route
            path="/nested-recursive-messages"
            element={<RecursiveMessagesPage />}
          />
          <Route path="/tic-tac-toe" element={<TicTacToePage />} />
          <Route path="/file-explorer" element={<FileExplorer />} />
          <Route path="/pagination" element={<PaginationPage />} />
          <Route path="/custom-hooks" element={<CustomHooksPage />} />
          <Route path="/timer" element={<TimerPage />} />

          {/* MULTISTEP FORM */}
          <Route path="/multistep-form-1" element={<FirstStep />} />
          <Route path="/multistep-form-2" element={<SecondStep />} />
          <Route path="/multistep-form-3" element={<ThirdStep />} />
          <Route path="/multistep-form-4" element={<ForthStep />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
