import cl from "./button.module.css";
import classes from "classnames";

export const Button = ({ text, className, ...props }: any) => {
  return (
    <button {...props} className={classes(cl.button, className)}>
      {text}
    </button>
  );
};
