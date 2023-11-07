import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import { HashRouter } from "react-router-dom";
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
      <HashRouter basename="/">
        <Routes>
          <Route path="/authorization" element={<LoginPage />} />
          <Route path={"/"} element={<BoardPage />} />
          <Route path={"/:id"} element={<BoardPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </HashRouter>
    </Provider>
  );
}

export default App;
