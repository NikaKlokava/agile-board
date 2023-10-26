import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BoardsType | never[] = {
  boards: [],
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchBoardsData: (state: BoardsType, action: PayloadAction<Boards>) => {
      state.boards = action.payload;
    },
    addBoard: (state: BoardsType, action: PayloadAction<BoardType>) => {
      state.boards = [...state.boards, action.payload];
    },
    updateBoard: (
      state: BoardsType,
      action: PayloadAction<UpdateBoardAction>
    ) => {
      const updatedBoards = state.boards.map((board: BoardType) => {
        const updatedBoard = {
          ...board,
          name: action.payload.name,
          columns: action.payload.columns,
          usersEmail: action.payload.usersEmail,
        };
        if (board.uuid === action.payload.uuid) return updatedBoard;
        return board;
      });
      state.boards = updatedBoards;
    },
    deleteBoard: (
      state: BoardsType,
      action: PayloadAction<{ uuid: string }>
    ) => {
      state.boards = state.boards.filter(
        (board: BoardType) => board.uuid !== action.payload.uuid
      );
    },
    resetBoards: () => initialState,
  },
});

export const {
  addBoard,
  updateBoard,
  deleteBoard,
  resetBoards,
  fetchBoardsData,
} = boardsSlice.actions;

export default boardsSlice.reducer;
