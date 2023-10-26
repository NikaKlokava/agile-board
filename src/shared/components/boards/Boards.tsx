import { isEqual } from "lodash";
import { useEffect } from "react";
import classes from "classnames";
import cl from "./boards.module.css";
import { selectBoard } from "../../../redux/reducers/activeBoardSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";

type Props = {
  onBoardVisible: () => void;
};

export const Boards = ({ onBoardVisible }: Props) => {
  const boards = useAppSelector((state) => state.boards.boards);
  const activeBoard = useAppSelector((state) => state.activeBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const activeBoardIndex = boards.findIndex(
      (board) => board.uuid === activeBoard.uuid
    );

    if (isEqual(activeBoardIndex, -1)) dispatch(selectBoard(boards[0]));
    dispatch(selectBoard(boards[activeBoardIndex]));
  }, [dispatch, boards, activeBoard.uuid]);

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
