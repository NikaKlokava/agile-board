import { memo } from "react";
import cl from "./login_item.module.css";

type Props = {
  type: "Google" | "Facebook";
  onClick: () => void;
};

export const LoginItem = memo(({ type, onClick }: Props) => {
  return (
    <div className={cl.login_btn_container}>
      <div className={cl[`${type}_icon`]} />
      <p data-testid="login_btn" className={cl.login_text} onClick={onClick}>
        {`  Log In with ${type}`}
      </p>
    </div>
  );
});
