import { addBoardNameAction, addColumnsAction } from "../actions/actions";

const initialState = {
  name: null,
  board_columns: [],
};

export const boardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case addBoardNameAction:
      return {
        ...state,
        name: action.payload.name,
      };
    case addColumnsAction:
      return {
        ...state,
        board_columns: action.payload.board_columns,
      };

    default:
      return state;
  }
};
