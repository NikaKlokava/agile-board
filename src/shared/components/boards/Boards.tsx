import { isEqual } from "lodash";
import { useEffect } from "react";
import classes from "classnames";
import cl from "./boards.module.css";
import { selectBoard } from "../../../redux/reducers/activeBoardSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hook";
import { auth } from "../../../firebase";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  onBoardVisible: () => void;
};

export const Boards = ({ onBoardVisible }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const boards = useAppSelector((state) => state.boards.boards);
  const activeBoard = useAppSelector((state) => state.activeBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const actvieId = Number(id?.slice(3));

    if (!id || isNaN(actvieId))
      dispatch(selectBoard(boards[0])) && navigate(`/agile-board/board/id=0`);
    else
      dispatch(selectBoard(boards[actvieId])) &&
        navigate(`/agile-board/board/id=${actvieId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userBoards = boards.filter(
    (board) => board.usersEmail[0] === auth.currentUser?.email
  );

  const sharedBoards = boards.filter(
    (board) => board.usersEmail[0] !== auth.currentUser?.email
  );

  return (
    <>
      <div className={cl.sidebar_title}>{`ALL BOARDS (${boards.length})`}</div>
      <div className={cl.board_title_items}>
        {userBoards.length !== 0 && (
          <>
            <div className={classes(cl.subtitle, cl.my_boards)}>My boards</div>
            {userBoards.map((board, index) => {
              return (
                <div
                  className={classes(
                    cl.title_item,
                    isEqual(board, activeBoard) && cl.active_board
                  )}
                  key={index}
                  onClick={() => {
                    navigate(`/agile-board/board/id=${index}`);
                    dispatch(selectBoard(board));
                  }}
                >
                  <div className={cl.board_icon} />
                  <p className={cl.title}>{board.name}</p>
                </div>
              );
            })}
          </>
        )}
        {sharedBoards?.length !== 0 && (
          <>
            <div className={classes(cl.subtitle, cl.shared_boards)}>
              Shared Boards
            </div>
            {sharedBoards.map((board, index) => {
              return (
                <div
                  className={classes(
                    cl.title_item,
                    isEqual(board, activeBoard) && cl.active_board
                  )}
                  key={index}
                  onClick={() => {
                    navigate(`/agile-board/board/id=shared${index}`);
                    dispatch(selectBoard(board));
                  }}
                >
                  <div className={cl.board_icon} />
                  <p className={cl.title}>{board.name}</p>
                </div>
              );
            })}
          </>
        )}
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
