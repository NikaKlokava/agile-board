import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectBoard } from "../../../redux/actionCreators/newBoardCreator";
import { NewBoardModal } from "./modals";
import { RootState } from "../../../redux/store/store";
import classes from "classnames";
import cl from "./styles/sidebar.module.css";

export const Sidebar = () => {
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);
  // const [active, setActive] = useState<boolean>(false)

  const dispatch = useDispatch();
  const storeData = useSelector<RootState, Boards>((state) => state.boards);

  const handleBoardClick = (e: any) => {
    dispatch(selectBoard(e.target.innerText));
    // setActive(e.target)
  };

  return (
    <div className={cl.sidebar_wrapper}>
      <div
        className={cl.sidebar_title}
      >{`ALL BOARDS (${storeData.length})`}</div>
      <div className={cl.board_title_items}>
        {storeData.map((board, index) => {
          return (
            <div
              className={classes(cl.title_item,board.selected && cl.active_board )}
              key={index}
              onClick={(e) => handleBoardClick(e)}
            >
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
