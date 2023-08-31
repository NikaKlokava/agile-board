import classes from "classnames";
import { useState } from "react";
import store from "../../../redux/store/store";
import { NewBoardModal } from "./modals";
import cl from "./styles/sidebar.module.css";

export const Sidebar = () => {
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);
  const storeData = store.getState();

  return (
    <div className={cl.sidebar_wrapper}>
      <div
        className={cl.sidebar_title}
      >{`ALL BOARDS (${storeData.boards.length})`}</div>
      <div className={cl.board_title_items}>
        {storeData.boards.map((board, index) => {
          return (
            <div className={cl.title_item} key={index}>
              <div className={cl.icon} />
              <p className={cl.title}>{board.name}</p>
            </div>
          );
        })}
        <div
          className={cl.title_item}
          data-testid="new-board"
          onClick={() => setNewBoardVisible(true)}
        >
          <div className={cl.icon_new_board} />
          <p className={classes(cl.title, cl.new_board)}>New board</p>
        </div>
      </div>
      <div className={cl.hide_sidebar}>
        <div className={cl.hide_icon} />
        <div className={cl.hide_text}>Hide sidebar</div>
      </div>
      {newBoardVisible && (
        <NewBoardModal onClose={() => setNewBoardVisible(false)} />
      )}
    </div>
  );
};
