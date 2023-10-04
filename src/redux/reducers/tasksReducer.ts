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
      const newSubtasks = action.payload.subtasks.map((subtask) => {
        return {
          ...subtask,
          uuid: uuidv4(),
          checked: false,
        };
      });

      const newTask = {
        ...action.payload,
        uuid: uuidv4(),
        time: new Date().getTime(),
        subtasks: newSubtasks,
      };

      return {
        ...state,
        tasks: [...state.tasks, newTask],
      };
    case CHECK_SUBTASK_ACTION:
      const checkedTasks = state.tasks.map((task: TaskType) => {
        const updatedSubtasks = task.subtasks.map((subtask) => {
          const checkedSubtask = {
            ...subtask,
            checked: !subtask.checked,
          };
          if (subtask.uuid === action.payload.subtaskUuid)
            return checkedSubtask;
          return subtask;
        });
        return {
          ...task,
          subtasks: updatedSubtasks,
        };
      });

      return {
        ...state,
        tasks: checkedTasks,
      };
    case MOVE_TASK_ACTION:
      const movedTasks = state.tasks.map((task: TaskType) => {
        const newTaskPos = {
          ...task,
          time: new Date().getTime(),
          columnUuid: action.payload.columnUuid,
        };
        if (task.uuid === action.payload.taskUuid) return newTaskPos;
        return task;
      });
      return {
        ...state,
        tasks: movedTasks,
      };
    case EDIT_TASK_ACTION:
      const updatedSubtasks = action.payload.subtasks.map((subtask) => {
        const newSubtask = {
          ...subtask,
          uuid: uuidv4(),
          checked: false,
        };
        if (!subtask.checked) return newSubtask;
        return { ...subtask, uuid: uuidv4() };
      });
      const updatedTasks = state.tasks.map((task: TaskType) => {
        const updatedTask = {
          ...task,
          title: action.payload.title,
          description: action.payload.description,
          subtasks: updatedSubtasks,
        };
        if (task.uuid === action.payload.taskUuid) {
          return updatedTask;
        }
        return task;
      });
      return {
        ...state,
        tasks: updatedTasks,
      };
    case DELETE_TASK_ACTION:
      return {
        ...state,
        tasks: state.tasks.filter(
          (task: TaskType) => task.uuid !== action.payload.taskUuid
        ),
      };
    default:
      return state;
  }
};
