import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";

function App() {
  return (
    <Routes>
      <Route path="/agile-board" element={<BoardPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
