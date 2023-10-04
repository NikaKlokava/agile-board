import { memo, useState } from "react";
import { Boards } from "../../../shared/components/boards";
import { NewBoardModal } from "./modals";
import cl from "./styles/sidebar.module.css";

export const Sidebar = memo(() => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);

  return (
    <>
      {sidebarVisible && (
        <div className={cl.sidebar_wrapper}>
          <Boards onBoardVisible={() => setNewBoardVisible(true)} />
          {newBoardVisible && (
            <NewBoardModal onClose={() => setNewBoardVisible(false)} />
          )}
        </div>
      )}
      <div
        className={cl.hide_sidebar}
        onClick={() => setSidebarVisible((prev) => !prev)}
      >
        <div className={sidebarVisible ? cl.hide_icon : cl.eye_icon} />
        {sidebarVisible && <div className={cl.hide_text}>Hide sidebar</div>}
      </div>
    </>
  );
});
