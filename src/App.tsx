import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import store from "./redux/store/store";
import { useAuthorization } from "./shared/hooks/useAuthorization";

function App() {
  const { isUserExist } = useAuthorization();

  if (!isUserExist) {
    return <LoginPage />;
  } else {
    window.history.replaceState("", "", "/agile-board");
  }

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/agile-board/authorization" element={<LoginPage />} />
        <Route path={"/agile-board"} element={<BoardPage />} />
        <Route path={"/agile-board/:id"} element={<BoardPage />} />
        <Route path={"/agile-board/board/:id"} element={<BoardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
