export const addBoard = ({ name, board_columns, selected }: any) => {
  return {
    type: "board/addBoard",
    payload: {
      name,
      board_columns,
      selected,
    },
  };
};

export const selectBoard = (boardName: string) => {
  return {
    type: "board/selectBoard",
    payload: {
      boardName,
    },
  };
};

export const addNewTask = (
  boardName: string,
  column: string,
  taskName: string,
  description: string,
  subtasks: string[]
) => {
  return {
    type: "task/addNewTask",
    payload: {
      boardName,
      column,
      taskName,
      description,
      subtasks,
    },
  };
};
export const addBoardName = ({ name }: BoardNameType) => {
  return {
    type: "board/addBoardName",
    payload: {
      name,
    },
  };
};

export const addColumns = ({ board_columns }: ColumnsType) => {
  return {
    type: "board/addColumns",
    payload: {
      board_columns: board_columns,
    },
  };
};
