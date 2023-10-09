import { Button } from "../../shared/components/button";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import cl from "./login.module.css";
import { auth, provider } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className={cl.login_wrapper}>
      <div className={cl.login_modal}>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <Button
          text={"Login with Google"}
          withIcon={false}
          testid={"log-in-btn"}
          type={"button"}
          onClick={() =>
            signInWithPopup(auth, provider)
              .then((result) => {
                GoogleAuthProvider.credentialFromResult(result);
                navigate("/agile-board");
              })
              .catch((error) => {
                GoogleAuthProvider.credentialFromError(error);
              })
          }
        />
      </div>
    </div>
  );
};
