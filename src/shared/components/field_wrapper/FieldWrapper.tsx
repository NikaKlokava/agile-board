import { ReactNode } from "react";
import cl from "./field_wrapper.module.css";

type Props = {
  children: ReactNode;
  fieldName: string;
};

export const FieldWrapper = ({ fieldName, children }: Props) => {
  return (
    <div className={cl.container}>
      <p className={cl.title}>{fieldName}</p>
      {children}
    </div>
  );
};
