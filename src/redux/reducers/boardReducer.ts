import { v4 as uuidv4 } from "uuid";
import { ADD_BOARD_ACTION } from "../actions/actions";

const initialState = {
  boards: [
    {
      uuid: uuidv4(),
      name: "Example",
      columns: [{ uuid: uuidv4(), title: "example" }],
    },
  ],
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

    default:
      return state;
  }
};
