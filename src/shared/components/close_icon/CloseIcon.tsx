import { memo } from "react";
import cl from "./close_icon.module.css";

type Props = {
  center?: boolean;
  onClose: () => void;
};

export const CloseIcon = memo(({ center, onClose }: Props) => {
  return (
    <div
      className={center? cl.close_icon_center : cl.close_icon}
      onClick={onClose}
    />
  );
});
