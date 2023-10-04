import { v4 as uuidv4 } from "uuid";
import {
  ADD_BOARD_ACTION,
  ADD_NEW_COLUMN_ACTION,
  DELETE_BOARD_ACTION,
} from "../actions/actions";

const initialState: BoardsType | never[] = {
  boards: [],
};

export const boardsReducer = (
  state = initialState,
  action: AddBoardActionType
) => {
  switch (action.type) {
    case ADD_BOARD_ACTION:
      const newBoard = {
        uuid: uuidv4(),
        ...action.payload,
        columns: action.payload.columns.map((column) => {
          return {
            ...column,
            uuid: uuidv4(),
          };
        }),
      };
      return {
        ...state,
        boards: [...state.boards, newBoard],
      };
    case ADD_NEW_COLUMN_ACTION:
      const newColumns = action.payload.columns.map((column) => {
        const newColumn = {
          ...column,
          uuid: uuidv4(),
        };
        if (!column.uuid) return newColumn;
        return column;
      });

      return {
        ...state,
        boards: state.boards.map((board: BoardType) => {
          const updatedBoard = {
            ...board,
            name: action.payload.name,
            columns: newColumns,
          };
          if (board.uuid === action.payload.uuid) return updatedBoard;
          return board;
        }),
      };
    case DELETE_BOARD_ACTION:
      return {
        ...state,
        boards: state.boards.filter(
          (board: BoardType) => board.uuid !== action.payload.uuid
        ),
      };
    default:
      return state;
  }
};
