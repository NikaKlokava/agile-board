import {
  addBoardAction,
  // addBoardNameAction,
  // addColumnsAction,
} from "../actions/actions";

const initialState = {
  boards: [
    {
      name: "Example board",
      board_columns: [],
    },
  ],
};

export const boardReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case addBoardAction:
      if (state.boards[0].name === "Example board") {
        return {
          ...state,
          boards: [
            {
              name: action.payload.name,
              board_columns: action.payload.board_columns,
            },
          ],
        };
      }

      return {
        ...state,
        boards: [...state.boards, action.payload],
      };

    // case addBoardNameAction:
    //   return {
    //     ...state,
    //     boards: [
    //       ...state.boards.map((board) => {
    //         return {
    //           ...board,
    //           name: action.payload.name,
    //         };
    //       }),
    //     ],
    //   };
    // case addColumnsAction:
    //   return {
    //     ...state,
    //     boards: [
    //       ...state.boards.map((board) => {
    //         return {
    //           ...board,
    //           board_columns: action.payload.board_columns,
    //         };
    //       }),
    //     ],
    //   };

    default:
      return state;
  }
};
