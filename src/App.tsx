import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import store from "./redux/store/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("agile-board");
      } else navigate("/agile-board/authorization");
    });
  }, [auth, navigate]);

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/agile-board" element={<BoardPage />} />
        <Route path="/agile-board/authorization" element={<LoginPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
