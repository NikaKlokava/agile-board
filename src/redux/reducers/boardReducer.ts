import {
  addBoardAction,
  addNewTaskAction,
  selectBoardAction,
} from "../actions/actions";

const initialState = {
  boards: [
    {
      name: "Example board",
      board_columns: [
        {
          title: "Todo",
          tasks: [{ taskName: "", description: "", subtasks: [] }],
        },
      ],
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

    case addNewTaskAction:
      return {
        ...state,
        boards: [
          ...state.boards.map((board) => {
            if (board.name === action.payload.boardName)
              return {
                ...board,
                board_columns: [
                  ...board.board_columns.map((column) => {
                    if (column.title === action.payload.column)
                      if (!column.tasks) {
                        return {
                          ...column,
                          tasks: [
                            {
                              taskName: action.payload.taskName,
                              description: action.payload.description,
                              subtasks: action.payload.subtasks,
                            },
                          ],
                        };
                      } else
                        return {
                          ...column,
                          tasks: [
                            ...column.tasks,
                            {
                              taskName: action.payload.taskName,
                              description: action.payload.description,
                              subtasks: action.payload.subtasks,
                            },
                          ],
                        };
                    return column;
                  }),
                ],
              };
            return board;
          }),
        ],
      };

    default:
      return state;
  }
};
