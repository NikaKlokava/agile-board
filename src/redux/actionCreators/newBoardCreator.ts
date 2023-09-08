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
      subtaskUuid,
    },
  };
};

export const addNewColumn = (
  uuid: string,
  name: string,
  columns: ColumnsType
) => {
  return {
    type: "ADD_NEW_COLUMN_ACTION",
    payload: {
      uuid,
      name,
      columns,
    },
  };
};

export const deleteBoard = (uuid: string) => {
  return {
    type: "DELETE_BOARD_ACTION",
    payload: {
      uuid,
    },
  };
};

export const deleteACtiveBoard = () => {
  return {
    type: "DELETE_ACTIVE_BOARD_ACTION",
  };
};

export const moveTask = (taskUuid: string, columnUuid: string) => {
  return {
    type: "MOVE_TASK_ACTION",
    payload: { taskUuid, columnUuid },
  };
};
