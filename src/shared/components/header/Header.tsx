import { Button } from "../button";
import cl from "./header.module.css";

export const Header = () => {
  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <p className={cl.board_name}>Board name</p>
        <div className={cl.navbar}></div>
      </div>
      <div className={cl.options}>
        <Button text={"Add New Task"} />
        <div className={cl.options_icon}></div>
      </div>
    </div>
  );
};
