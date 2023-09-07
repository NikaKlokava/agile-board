import { v4 as uuidv4 } from "uuid";
import {
  ADD_BOARD_ACTION,
  ADD_NEW_COLUMN_ACTION,
  DELETE_BOARD_ACTION,
} from "../actions/actions";

const initialState = {
  boards: [],
};

export const boardsReducer = (
  state = initialState,
  action: AddBoardActionType
) => {
  switch (action.type) {
    case ADD_BOARD_ACTION:
      return {
        ...state,
        boards: [
          ...state.boards,
          {
            uuid: uuidv4(),
            ...action.payload,
            columns: action.payload.columns.map((column) => {
              return {
                ...column,
                uuid: uuidv4(),
              };
            }),
          },
        ],
      };

    case ADD_NEW_COLUMN_ACTION:
      return {
        ...state,
        boards: [
          ...state.boards.map((board: BoardType) => {
            if (board.uuid === action.payload.uuid)
              return {
                ...board,
                name: action.payload.name,
                columns: action.payload.columns.map((column) => {
                  if (!column.uuid)
                    return {
                      ...column,
                      uuid: uuidv4(),
                    };
                  return column;
                }),
              };
            return board;
          }),
        ],
      };
    case DELETE_BOARD_ACTION:
      return {
        ...state,
        boards: [
          ...state.boards.filter(
            (board: BoardType) => board.uuid !== action.payload.uuid
          ),
        ],
      };
    default:
      return state;
  }
};
