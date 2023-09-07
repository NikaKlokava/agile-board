import {
  ADD_NEW_TASK_ACTION,
  CHECK_SUBTASK_ACTION,
  MOVE_TASK_ACTION,
} from "../actions/actions";
import { v4 as uuidv4 } from "uuid";

const initialTasksState = {
  tasks: [],
};

export const tasksReducer = (
  state = initialTasksState,
  action: AddTaskActionType
) => {
  switch (action.type) {
    case ADD_NEW_TASK_ACTION:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            ...action.payload,
            uuid: uuidv4(),
            subtasks: [
              ...action.payload.subtasks.map((subtask) => {
                return {
                  ...subtask,
                  uuid: uuidv4(),
                  checked: false,
                };
              }),
            ],
          },
        ],
      };
    case CHECK_SUBTASK_ACTION:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task: TaskType) => {
            return {
              ...task,
              subtasks: [
                ...task.subtasks.map((subtask) => {
                  if (subtask.uuid === action.payload.subtaskUuid)
                    return {
                      ...subtask,
                      checked: !subtask.checked,
                    };
                  return subtask;
                }),
              ],
            };
          }),
        ],
      };
    case MOVE_TASK_ACTION:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task: TaskType) => {
            if (task.uuid === action.payload.taskUuid)
              return {
                ...task,
                columnUuid: action.payload.columnUuid,
              };
            return task;
          }),
        ],
      };

    default:
      return state;
  }
};
