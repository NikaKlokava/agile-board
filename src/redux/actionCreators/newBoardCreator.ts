import {
  ADD_BOARD_ACTION,
  ADD_NEW_COLUMN_ACTION,
  ADD_NEW_TASK_ACTION,
  CHECK_SUBTASK_ACTION,
  DELETE_ACTIVE_BOARD_ACTION,
  DELETE_BOARD_ACTION,
  DELETE_TASK_ACTION,
  EDIT_TASK_ACTION,
  MOVE_TASK_ACTION,
  SELECT_BOARD_ACTION,
} from "../actions/actions";

export const addBoard = ({ name, columns }: AddBoardPayloadType) => ({
  type: ADD_BOARD_ACTION,
  payload: {
    name,
    columns,
  },
});

export const selectBoard = (board: BoardType) => ({
  type: SELECT_BOARD_ACTION,
  payload: {
    board,
  },
});

export const addNewTask = ({
  boardUuid,
  columnUuid,
  title,
  description,
  subtasks,
}: AddTaskPayloadType) => ({
  type: ADD_NEW_TASK_ACTION,
  payload: {
    boardUuid,
    columnUuid,
    title,
    description,
    subtasks,
  },
});

export const checkSubtask = (subtaskUuid: string) => ({
  type: CHECK_SUBTASK_ACTION,
  payload: {
    subtaskUuid,
  },
});

export const addNewColumn = (
  uuid: string,
  name: string,
  columns: ColumnsType
) => ({
  type: ADD_NEW_COLUMN_ACTION,
  payload: {
    uuid,
    name,
    columns,
  },
});

export const deleteBoard = (uuid: string) => ({
  type: DELETE_BOARD_ACTION,
  payload: {
    uuid,
  },
});

export const deleteACtiveBoard = () => ({
  type: DELETE_ACTIVE_BOARD_ACTION,
});

export const moveTask = (taskUuid: string, columnUuid: string) => ({
  type: MOVE_TASK_ACTION,
  payload: { taskUuid, columnUuid },
});

export const editTask = (
  taskUuid: string,
  title: string,
  description: string,
  subtasks: SubtasksType
) => ({
  type: EDIT_TASK_ACTION,
  payload: { taskUuid, title, description, subtasks },
});

export const deleteTask = (taskUuid: string) => ({
  type: DELETE_TASK_ACTION,
  payload: { taskUuid },
});
