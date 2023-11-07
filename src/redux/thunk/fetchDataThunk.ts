import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { onValue, ref } from "firebase/database";
import { auth, database } from "../../firebase";
import { changeStatus, fetchBoardsData } from "../reducers/boardsSlice";
import { fetchTasksData } from "../reducers/tasksSlice";
import { AppThunk } from "../store/store";

export const fetchBoards = (): AppThunk => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const boardsRef = ref(database, "users/boards");
      onValue(boardsRef, (snapshot) => {
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
          dispatch(changeStatus({ isLoading: false }));
        } else {
          console.log("No boards available");
          dispatch(changeStatus({ isLoading: false }));
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchTasks = (): AppThunk => {
  return async (dispatch: Dispatch<AnyAction>) => {
    try {
      const tasksRef = ref(database, "users/tasks");
      onValue(
        tasksRef,
        (snapshot) => {
          if (snapshot.exists()) {
            const res = snapshot.val();
            const tasks: Tasks = Object.values(res);

            dispatch(fetchTasksData(tasks));
          } else {
            console.log("No tasks available");
          }
        },
        (err) => console.log(err)
      );
    } catch (error) {
      console.log(error);
    }
  };
};
