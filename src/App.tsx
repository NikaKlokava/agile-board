import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";
import store from "./redux/store/store";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/agile-board" element={<BoardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
