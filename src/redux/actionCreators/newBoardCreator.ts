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

export const addNewTask = ({
  boardUuid,
  columnUuid,
  title,
  description,
  subtasks,
}: AddTaskPayloadType) => {
  return {
    type: "ADD_NEW_TASK_ACTION",
    payload: {
      boardUuid,
      columnUuid,
      title,
      description,
      subtasks,
    },
  };
};

export const checkSubtask = (subtaskUuid: string) => {
  return {
    type: "CHECK_SUBTASK_ACTION",
    payload: {
      subtaskUuid
    },
  };
};
