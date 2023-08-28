import { MockBoards } from "../../../mocks/BoardMocks";
import { Button } from "../../../shared/components/button";
// import { OptionsModal } from "./modals/OptionsModal";
import cl from "./styles/header.module.css";

export const Header = () => {
  const data = MockBoards;
  return (
    <div className={cl.header_wrapper}>
      <div className={cl.app_title}>
        <div className={cl.app_logo}></div>
        <h1 className={cl.title}>AGILE-BOARD</h1>
        <p className={cl.board_name}>{data[0].name}</p>
        <div className={cl.navbar}></div>
      </div>
      <div className={cl.options}>
        <Button text={"Add New Task"} withIcon={true} />
        <div className={cl.options_icon} />
      </div>
      {/* <OptionsModal /> */}
    </div>
  );
};
