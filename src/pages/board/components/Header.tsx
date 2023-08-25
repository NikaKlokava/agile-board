import { Button } from "../../../shared/components/button";
import { OptionsModal } from "./OptionsModal";
import cl from "./styles/header.module.css";

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
        <Button text={"Add New Task"} withIcon={true} />
        <div className={cl.options_icon}></div>
      </div>
      <OptionsModal />
    </div>
  );
};
