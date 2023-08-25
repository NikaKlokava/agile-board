import { ReactNode } from "react";
import classes from "classnames";
import cl from "./field_wrapper.module.css";

type Props = {
  children: ReactNode;
  fieldName: string;
  clName?: "style_container";
};

export const FieldWrapper = ({ fieldName, children, clName }: Props) => {
  return (
    <div className={classes(cl.container, clName && cl[clName])}>
      <p className={cl.title}>{fieldName}</p>
      {children}
    </div>
  );
};
