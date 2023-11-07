import { ref, remove, set, update } from "firebase/database";
import { database } from "../../firebase";
import { AppThunk } from "../store/store";
import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { changeStatus } from "../reducers/boardsSlice";

export const addUserBoardData =
  (newBoard: BoardType): AppThunk =>
  async (dispatch: Dispatch<AnyAction>) => {
    dispatch(changeStatus({ isLoading: true }));

    const boardsRef = ref(database, `users/boards/` + newBoard.uuid);
    try {
      set(boardsRef, {
        ...newBoard,
      });
    } catch (error) {
      console.log(error + "while saving board data");
    } finally {
      dispatch(changeStatus({ isLoading: false }));
    }
  };

export const updateUserBoardData =
  (board: UpdateBoardAction): AppThunk =>
  async () => {
    try {
      const updates: any = {};
      const index = "users/boards/" + board.uuid;
      updates[index] = board;
      return update(ref(database), updates);
    } catch (error) {
      console.log(error + "while updating boards");
    }
  };

export const deleteUserBoard =
  (uuid: string): AppThunk =>
  async () => {
    try {
      remove(ref(database, "users/boards/" + uuid));
    } catch (error) {
      console.log(error + "while deleting data");
    }
  };
