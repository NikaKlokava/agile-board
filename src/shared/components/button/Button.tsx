import cl from "./button.module.css";
import classes from "classnames";

export const Button = ({ text, className, ...props }: any) => {
  return (
    <div className={classes(cl.button, className)}>
      <div className={cl.button_icon}></div>
      <div className={cl.button_text}>{text}</div>
    </div>
  );
};
