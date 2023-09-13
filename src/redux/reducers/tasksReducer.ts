import {
  ADD_NEW_TASK_ACTION,
  CHECK_SUBTASK_ACTION,
  DELETE_TASK_ACTION,
  EDIT_TASK_ACTION,
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
            time: new Date().getTime(),
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
                time: new Date().getTime(),
                columnUuid: action.payload.columnUuid,
              };
            return task;
          }),
        ],
      };
    case EDIT_TASK_ACTION:
      return {
        ...state,
        tasks: [
          ...state.tasks.map((task: TaskType) => {
            if (task.uuid === action.payload.taskUuid) {
              return {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                subtasks: action.payload.subtasks.map((subtask) => {
                  return {
                    ...subtask,
                    uuid: uuidv4(),
                    checked: false,
                  };
                }),
              };
            }
            return task;
          }),
        ],
      };
    case DELETE_TASK_ACTION:
      return {
        ...state,
        tasks: [
          ...state.tasks.filter(
            (task: TaskType) => task.uuid !== action.payload.taskUuid
          ),
        ],
      };
    default:
      return state;
  }
};
