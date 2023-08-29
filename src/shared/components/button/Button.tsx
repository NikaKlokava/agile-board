import cl from "./button.module.css";
import classes from "classnames";

type Props = {
  text: string;
  withIcon: boolean;
  testid: string;
  onClick?: () => void;
  newClass?: "center" | "delete" | "cancel" | "add-new-task";
};

export const Button = ({ text, withIcon, newClass, onClick, testid }: Props) => {
  return (
    <div
      className={classes(cl.button, newClass && cl[newClass])}
      onClick={onClick}
      data-testid={testid}
    >
      {withIcon && <div className={cl.button_icon} />}
      <div className={cl.button_text}>{text}</div>
    </div>
  );
};
