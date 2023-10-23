import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { child, get, ref } from "firebase/database";
import { auth, database } from "../../firebase";
import { fetchBoardsData } from "../reducers/boardsSlice";
import { fetchTasksData } from "../reducers/tasksSlice";
import { AppThunk } from "../store/store";

export const fetchBoards = (): AppThunk => {
  return async (dispatch: Dispatch<AnyAction>) => {
    get(child(ref(database), "users/" + auth.currentUser?.uid + "/boards"))
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
          dispatch(fetchBoardsData(sortedBoards));
        } else {
          console.log("No boards data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const fetchTasks = (): AppThunk => {
  return async (dispatch: Dispatch<AnyAction>) => {
    get(child(ref(database), "users/" + auth.currentUser?.uid + "/tasks"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const res = snapshot.val();
          const tasks: Tasks = Object.values(res);

          dispatch(fetchTasksData(tasks));
        } else {
          console.log("No tasks data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
