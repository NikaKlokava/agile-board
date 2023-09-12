import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewBoardModal } from "./modals";
import { selectBoard } from "../../../redux/actionCreators/newBoardCreator";
import { isEqual } from "lodash";
import classes from "classnames";
import cl from "./styles/sidebar.module.css";

export const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(true);
  const [newBoardVisible, setNewBoardVisible] = useState<boolean>(false);

  const boards = useSelector<RootState, Boards>((state) => state.boards.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(selectBoard(boards[0]));
  }, [dispatch, boards]);

  const activeBoard = useSelector<RootState, BoardType>(
    (state) => state.activeBoard
  );

  return (
    <>
      {sidebarVisible && (
        <div className={cl.sidebar_wrapper}>
          <div
            className={cl.sidebar_title}
          >{`ALL BOARDS (${boards.length})`}</div>
          <div className={cl.board_title_items}>
            {boards.map((board, index) => {
              return (
                <div
                  className={classes(
                    cl.title_item,
                    isEqual(board, activeBoard) && cl.active_board
                  )}
                  key={index}
                  onClick={() => dispatch(selectBoard(board))}
                >
                  <div className={cl.icon} />
                  <p className={cl.title}>{board.name}</p>
                </div>
              );
            })}
          </div>
          <div
            className={cl.title_item}
            data-testid="new-board"
            onClick={() => setNewBoardVisible(true)}
          >
            <div className={cl.icon_new_board} />
            <p className={classes(cl.title, cl.new_board)}>New board</p>
          </div>
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
};
