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

  const userBoards = boards.filter(
    (board) => board.usersEmail[0] === auth.currentUser?.email
  );

  const sharedBoards = boards.filter(
    (board) => board.usersEmail[0] !== auth.currentUser?.email
  );

  useEffect(() => {
    const isMyBoard = id?.slice(0, 5) === "id=mb";
    const noBoardId = isNaN(Number(id?.slice(5)));
    const boardId = Number(id?.slice(5));

    const updateActiveBoard = (boards: Boards, id: number, path: string) => {
      dispatch(selectBoard(boards[id]));
      navigate(`/id=${path}`);
    };

    if (!id || noBoardId) {
      updateActiveBoard(userBoards, 0, "mb0");
    } else {
      if (isMyBoard) {
        updateActiveBoard(userBoards, boardId, `mb${boardId}`);
      } else {
        !sharedBoards[boardId] && updateActiveBoard(userBoards, 0, "mb0");
        updateActiveBoard(sharedBoards, boardId, `sb${boardId}`);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boards]);

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
                    navigate(`/id=mb${index}`);
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
                    navigate(`/id=sb${index}`);
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
