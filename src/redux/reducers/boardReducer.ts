import { addBoardAction, selectBoardAction } from "../actions/actions";

const initialState = {
  boards: [
    {
      name: "Example board",
      board_columns: [],
      selected: true,
    },
  ],
};

export const boardsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case addBoardAction:
      if (state.boards[0].name === "Example board") {
        return {
          ...state,
          boards: [
            {
              name: action.payload.name,
              board_columns: action.payload.board_columns,
              selected: true,
            },
          ],
        };
      }

      return {
        ...state,
        boards: [...state.boards, action.payload],
      };

    case selectBoardAction:
      return {
        ...state,
        boards: [
          ...state.boards.map((board) => {
            if (board.name === action.payload.boardName) {
              return {
                ...board,
                selected: true,
              };
            }
            return {
              ...board,
              selected: false,
            };
          }),
        ],
      };

    default:
      return state;
  }
};
