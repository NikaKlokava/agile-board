import { SELECT_BOARD_ACTION } from "../actions/actions";

const initialState = { uuid: "", name: "", columns: [] };

export const activeBoardReducer = (
  state = initialState,
  action: SelectBoardActionType
) => {
  switch (action.type) {
    case SELECT_BOARD_ACTION:
      return {
        ...state,
        ...action.payload.board,
      };

    default:
      return state;
  }
};
