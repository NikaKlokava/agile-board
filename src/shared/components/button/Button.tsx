import cl from "./button.module.css";
import classes from "classnames";

type Props = {
  text: string;
  withIcon: boolean;
  newClass?: "center";
};

export const Button = ({ text, withIcon, newClass }: Props) => {
  return (
    <div className={classes(cl.button,newClass && cl[newClass])}>
      {withIcon && <div className={cl.button_icon} />}
      <div className={cl.button_text}>{text}</div>
    </div>
  );
};
