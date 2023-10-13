import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addUserBoardData,
  deleteUserBoard,
  updateUserBoardData,
} from "../../utils/utils";

const initialState: BoardsType | never[] = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state: BoardsType, action: PayloadAction<AddBoardAction>) => {
      const newBoard = action.payload.time
        ? {
            ...action.payload,
            uuid: uuidv4(),
            columns: action.payload.columns.map((column) => {
              if (!column.uuid)
                return {
                  ...column,
                  uuid: uuidv4(),
                };
              return column;
            }),
          }
        : {
            ...action.payload,
            uuid: uuidv4(),
            time: new Date().getTime(),
            columns: action.payload.columns.map((column) => {
              if (!column.uuid)
                return {
                  ...column,
                  uuid: uuidv4(),
                };
              return column;
            }),
          };
      onAuthStateChanged(auth, (user) => {
        user && addUserBoardData(user.uid, newBoard);
      });
      state.boards = [...state.boards, newBoard];
    },
    addNewColumn: (
      state: BoardsType,
      action: PayloadAction<AddColumnAction>
    ) => {
      const newColumns = action.payload.columns.map((column) => {
        const newColumn = {
          ...column,
          uuid: uuidv4(),
        };
        if (!column.uuid) return newColumn;
        return column;
      });
      const updatedBoards = state.boards.map((board: BoardType) => {
        const updatedBoard = {
          ...board,
          name: action.payload.name,
          columns: newColumns,
        };
        if (board.uuid === action.payload.uuid) return updatedBoard;
        return board;
      });
      state.boards = updatedBoards;
      onAuthStateChanged(auth, (user) => {
        user && updateUserBoardData(user.uid, updatedBoards);
      });
    },
    deleteBoard: (
      state: BoardsType,
      action: PayloadAction<{ uuid: string }>
    ) => {
      onAuthStateChanged(auth, (user) => {
        user && deleteUserBoard(user.uid, action.payload.uuid);
      });
      state.boards = state.boards.filter(
        (board: BoardType) => board.uuid !== action.payload.uuid
      );
    },
  },
});

export const { addBoard, addNewColumn, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
