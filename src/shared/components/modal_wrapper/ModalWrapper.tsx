import { ReactNode } from "react";
import cl from "./modal_wrapper.module.css";

type Props = {
  onWrapperClick?: () => void;
  children: ReactNode;
};

export const ModalWrapper = ({ onWrapperClick, children }: Props) => {
  return (
    <>
      <div className={cl.modal_wrapper} onClick={onWrapperClick}></div>
      <div className={cl.modal_container}> {children}</div>
    </>
  );
};
