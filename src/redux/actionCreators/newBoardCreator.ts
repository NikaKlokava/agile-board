export const addBoard = ({ name, columns }: AddBoardPayloadType) => {
  return {
    type: "ADD_BOARD_ACTION",
    payload: {
      name,
      columns,
    },
  };
};

export const selectBoard = (board: BoardType) => {
  return {
    type: "SELECT_BOARD_ACTION",
    payload: {
      board,
    },
  };
};

export const addNewTask = (
  boardName: string,
  column: string,
  taskName: string,
  description: string,
  subtasks: SubtasksType
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

export const checkSubtask = (
  boardName: string,
  column: string,
  taskName: string,
  subtask: string
) => {
  return {
    type: "subtask/CheckSubtask",
    payload: {
      boardName,
      column,
      taskName,
      subtask,
    },
  };
};
