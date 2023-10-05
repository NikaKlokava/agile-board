import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: BoardsType | never[] = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (
      state: BoardsType,
      action: PayloadAction<{ name: string; columns: { title: string }[] }>
    ) => {
      const newBoard = {
        ...action.payload,
        uuid: uuidv4(),
        columns: action.payload.columns.map((column) => {
          return {
            ...column,
            uuid: uuidv4(),
          };
        }),
      };
      state.boards = [...state.boards, newBoard];
    },
    addNewColumn: (
      state: BoardsType,
      action: PayloadAction<{
        name: string;
        columns: { title: string; uuid?: string }[];
        uuid: string | undefined;
      }>
    ) => {
      const newColumns = action.payload.columns.map((column) => {
        const newColumn = {
          ...column,
          uuid: uuidv4(),
        };
        if (!column.uuid) return newColumn;
        return column;
      });
      state.boards = state.boards.map((board: BoardType) => {
        const updatedBoard = {
          ...board,
          name: action.payload.name,
          columns: newColumns,
        };
        if (board.uuid === action.payload.uuid) return updatedBoard;
        return board;
      });
    },
    deleteBoard: (
      state: BoardsType,
      action: PayloadAction<{ uuid: string }>
    ) => {
      state.boards = state.boards.filter(
        (board: BoardType) => board.uuid !== action.payload.uuid
      );
    },
  },
});

export const { addBoard, addNewColumn, deleteBoard } = boardsSlice.actions;

export default boardsSlice.reducer;
