import { useDispatch, useSelector } from "react-redux";
import { isEqual } from "lodash";
import { useEffect } from "react";
import { selectBoard } from "../../../redux/actionCreators/newBoardCreator";
import classes from "classnames";
import cl from "./boards.module.css";

type Props = {
  onBoardVisible: () => void;
};

export const Boards = ({ onBoardVisible }: Props) => {
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
      <div className={cl.sidebar_title}>{`ALL BOARDS (${boards.length})`}</div>
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
        onClick={onBoardVisible}
      >
        <div className={cl.icon_new_board} />
        <p className={classes(cl.title, cl.new_board)}>New board</p>
      </div>
    </>
  );
};
