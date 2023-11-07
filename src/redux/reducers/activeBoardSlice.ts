import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: BoardType = {
  uuid: "",
  name: "",
  columns: [],
  usersEmail: [],
  time: 0,
};

export const activeBoardSlice = createSlice({
  name: "active-board",
  initialState,
  reducers: {
    selectBoard: (_, action: PayloadAction<BoardType>) => action.payload,
    deleteActiveBoard: (state: BoardType) => ({ ...state, ...initialState }),
  },
});

export const { selectBoard, deleteActiveBoard } = activeBoardSlice.actions;

export default activeBoardSlice.reducer;
