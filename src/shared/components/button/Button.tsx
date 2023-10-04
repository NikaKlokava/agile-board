import { memo } from "react";
import cl from "./button.module.css";
import classes from "classnames";

type Props = {
  text: string;
  withIcon: boolean;
  testid: string;
  onClick?: () => void;
  newClass?: "center" | "delete" | "cancel" | "add-new-task";
  type: "submit" | "button";
};

export const Button = memo(
  ({ text, withIcon, newClass, onClick, testid, type }: Props) => {
    return (
      <button
        className={classes(cl.button, newClass && cl[newClass])}
        onClick={onClick}
        data-testid={testid}
        type={type}
      >
        {withIcon && <div className={cl.button_icon} />}
        <div className={cl.button_text}>{text}</div>
      </button>
    );
  }
);
