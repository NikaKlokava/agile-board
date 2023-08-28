import { ReactNode } from "react";
import cl from "./modal_wrapper.module.css";

type Props = {
  children: ReactNode;
};

export const ModalWrapper = ({ children }: Props) => {
  return (
    <div className={cl.modal_wrapper}>
      <div className={cl.modal_container}> {children}</div>
    </div>
  );
};
