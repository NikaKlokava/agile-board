import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TasksType = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    fetchTasksData: (state: TasksType, action: PayloadAction<Tasks>) => {
      state.tasks = action.payload;
    },
    addNewTask: (state: TasksType, action: PayloadAction<Task>) => {
      if (!state.tasks) state.tasks = [action.payload];
      state.tasks = [...state.tasks, action.payload];
    },
    checkSubtask: (
      state: TasksType,
      action: PayloadAction<{ taskUuid: string; updatedSubtasks: SubtasksType }>
    ) => {
      const checkedTasks = state.tasks.map((task: Task) => {
        if (task.uuid === action.payload.taskUuid)
          return {
            ...task,
            subtasks: action.payload.updatedSubtasks,
          };
        return task;
      });
      state.tasks = checkedTasks;
    },
    editTask: (state: TasksType, action: PayloadAction<Task>) => {
      const updatedTasks = state.tasks.map((task: Task) => {
        if (task.uuid === action.payload.uuid) {
          return action.payload;
        }
        return task;
      });
      state.tasks = updatedTasks;
    },
    moveTask: (state: TasksType, action: PayloadAction<MoveTaskAction>) => {
      const movedTasks = state.tasks.map((task: Task) => {
        const newTaskPos = {
          ...task,
          time: action.payload.time,
          columnUuid: action.payload.columnUuid,
        };
        if (task.uuid === action.payload.taskUuid) return newTaskPos;
        return task;
      });
      state.tasks = movedTasks;
    },
    deleteTask: (state: TasksType, action: PayloadAction<{ uuid: string }>) => {
      state.tasks = state.tasks.filter(
        (task: Task) => task.uuid !== action.payload.uuid
      );
    },
    resetTasks: () => {},
    saveTaskData: (_, _action: PayloadAction<{ newTask: Task }>) => {},
    updateTaskData: (_, _action: PayloadAction<{ updatedTask: Task }>) => {},
    updateSubtasksData: (
      _,
      _action: PayloadAction<{
        taskUuid: string;
        updatedSubtasks: SubtasksType;
      }>
    ) => {},
    deleteTaskData: (_, _action: PayloadAction<{ uuid: string }>) => {},
  },
});

export const {
  addNewTask,
  checkSubtask,
  editTask,
  moveTask,
  deleteTask,
  resetTasks,
  fetchTasksData,
  saveTaskData,
  updateTaskData,
  updateSubtasksData,
  deleteTaskData,
} = tasksSlice.actions;

export default tasksSlice.reducer;
