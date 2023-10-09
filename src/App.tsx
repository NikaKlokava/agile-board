import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "./index.css";
import { BoardPage } from "./pages/board";
import { ErrorPage } from "./pages/error";
import { LoginPage } from "./pages/login";
import store from "./redux/store/store";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(false);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) setUser(true);
  });
  
  useEffect(() => {
    !user && navigate("/agile-board/authorization");
  }, [navigate, user]);

  return (
    <Provider store={store}>
      <Routes>
        {user && <Route path="/agile-board" element={<BoardPage />} />}
        {!user && (
          <Route path="/agile-board/authorization" element={<LoginPage />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Provider>
  );
}

export default App;
