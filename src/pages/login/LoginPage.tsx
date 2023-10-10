import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider } from "../../firebase";
import cl from "./login.module.css";

export const LoginPage = () => {
  return (
    <div className={cl.login_wrapper}>
      <div className={cl.login_modal}>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <div className={cl.line}/>
        <div className={cl.login_btn_container}>
          <div className={cl.gmail_icon} />
          <p
            className={cl.login_text}
            onClick={() =>
              signInWithPopup(auth, provider)
                .then((result) => {
                  GoogleAuthProvider.credentialFromResult(result);
                })
                .catch((error) => {
                  GoogleAuthProvider.credentialFromError(error);
                })
            }
          >
            Log in with Google
          </p>
        </div>
      </div>
    </div>
  );
};
