import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { child, push, ref, set } from "firebase/database";
import { auth, database } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState: BoardsType | never[] = {
  boards: [],
};

const addUserBoardData = (userId: string, newBoard: BoardType) => {
  const boardsRef = ref(database, "users/" + userId + "/boards");
  const newBoardRef = push(boardsRef);
  set(newBoardRef, {
    ...newBoard,
  });
};
const updateUserColumnData = (
  userId: string,
  newColumns: { title: string; uuid?: string | undefined }[]
) => {
  const newPostKey = push(child(ref(database), "boards")).key;
  console.log(newPostKey);
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  // updates['users/' + userId + '/boards' + newPostKey + "/columns"] = newColumns;

  // return update(ref(database), updates);
};

export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    addBoard: (state: BoardsType, action: PayloadAction<AddBoardAction>) => {
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
      onAuthStateChanged(auth, (user) => {
        user && updateUserColumnData(user.uid, newColumns);
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
