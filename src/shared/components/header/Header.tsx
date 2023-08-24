import { Button } from "../button";
import cl from "./header.module.css";

export const Header = () => {
  return (
    <div className={cl.header_wrapper}>
      <p className={cl.board_name}>Board name</p>
      <div className={cl.options}>
        <Button text={"+ Add New Task"} />
        <div className={cl.options_icon}></div>
      </div>
    </div>
  );
};
