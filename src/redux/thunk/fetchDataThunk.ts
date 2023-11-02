import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../firebase";
import { changeStatus, fetchBoardsData } from "../reducers/boardsSlice";
import { AppThunk } from "../store/store";

export const fetchBoards = (): AppThunk => {
  return async (dispatch: Dispatch<AnyAction>) => {
    get(child(ref(database), "users/boards"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const boards: Boards = Object.values(res);
          const sortedBoards = boards.sort((a, b) => {
            if (a.time && b.time) {
              return a.time - b.time;
            }
            return 0;
          });

          const userBoards = sortedBoards.filter((board) => {
            return (
              board.usersEmail?.findIndex(
                (email) => email === auth.currentUser?.email
              ) !== -1
            );
          });

          dispatch(fetchBoardsData(userBoards));
        } else {
          console.log("No boards data available");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => dispatch(changeStatus({ isLoading: false })));
  };
};
