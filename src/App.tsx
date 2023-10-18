import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import store from "./redux/store/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

function App() {
  const [isUserExist, setIsUserExist] = useState<boolean>(false);

  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsUserExist(true);
      else setIsUserExist(false);
    });
  }, [auth]);

  if (!isUserExist) {
    return <LoginPage />;
  }

  return (
    <Provider store={store}>
      <Routes>
        <Route path="/agile-board/authorization" element={<LoginPage />} />
        <Route path="/agile-board" element={<BoardPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
