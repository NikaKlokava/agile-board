import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { useCallback, useEffect } from "react";
import { auth, googleProvider, facebookProvider } from "../../firebase";
import { LoginItem } from "../../shared/components/login_item";
import cl from "./login.module.css";

export const LoginPage = () => {
  useEffect(() => {
    window.history.replaceState("", "", "/agile-board#/authorization");
  }, []);

  const handleLoginGoogleClick = useCallback(() => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        GoogleAuthProvider.credentialFromError(error);
      });
  }, []);

  const handleLoginFacebookClick = useCallback(async () => {
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        FacebookAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        if (error.code === "auth/account-exists-with-different-credential")
          signInWithPopup(auth, googleProvider)
            .then((result) => {
              GoogleAuthProvider.credentialFromResult(result);
            })
            .catch((error) => {
              GoogleAuthProvider.credentialFromError(error);
            });

        FacebookAuthProvider.credentialFromError(error);
      });
  }, []);

  return (
    <div className={cl.login_wrapper}>
      <div className={cl.login_modal}>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <div className={cl.line} />
        <div className={cl.greeting_container}>
          <p className={cl.subtitle}>Hello!</p>
          <p className={cl.subtitle}>
            To continue using the board, please Log In.
          </p>
        </div>
        <div className={cl.login_container}>
          <LoginItem type="Google" onClick={handleLoginGoogleClick} />
          <LoginItem type="Facebook" onClick={handleLoginFacebookClick} />
        </div>
      </div>
    </div>
  );
};
