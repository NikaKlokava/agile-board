import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  addUserTasksData,
  removeUserTask,
  updateUserTasksData,
} from "../../utils/utils";

const initialState: TasksType = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state: TasksType, action: PayloadAction<AddNewTaskAction>) => {
      const newSubtasks = action.payload.subtasks.map((subtask) => {
        if (!subtask.checked)
          return {
            ...subtask,
            uuid: uuidv4(),
            checked: false,
          };
        return {
          ...subtask,
          uuid: uuidv4(),
        };
      });
      const newTask = {
        ...action.payload,
        uuid: uuidv4(),
        time: new Date().getTime(),
        subtasks: newSubtasks,
      };
      onAuthStateChanged(auth, (user) => {
        user && addUserTasksData(user.uid, newTask);
      });
      state.tasks = [...state.tasks, newTask];
    },
    checkSubtask: (
      state: TasksType,
      action: PayloadAction<{ subtaskUuid: string; taskUuid: string }>
    ) => {
      const checkedTasks = state.tasks.map((task: Task) => {
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
      onAuthStateChanged(auth, (user) => {
        user && updateUserTasksData(user.uid, checkedTasks);
      });

      state.tasks = checkedTasks;
    },
    editTask: (state: TasksType, action: PayloadAction<EditTaskAction>) => {
      const updatedSubtasks = action.payload.subtasks.map((subtask) => {
        const newSubtask = {
          ...subtask,
          uuid: uuidv4(),
          checked: false,
        };
        if (!subtask.checked) return newSubtask;
        return { ...subtask, uuid: uuidv4() };
      });
      const updatedTasks = state.tasks.map((task: Task) => {
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
      onAuthStateChanged(auth, (user) => {
        user && updateUserTasksData(user.uid, updatedTasks);
      });
      state.tasks = updatedTasks;
    },
    moveTask: (state: TasksType, action: PayloadAction<MoveTaskAction>) => {
      const movedTasks = state.tasks.map((task: Task) => {
        const newTaskPos = {
          ...task,
          time: new Date().getTime(),
          columnUuid: action.payload.columnUuid,
        };
        if (task.uuid === action.payload.taskUuid) return newTaskPos;
        return task;
      });
      onAuthStateChanged(auth, (user) => {
        user && updateUserTasksData(user.uid, movedTasks);
      });
      state.tasks = movedTasks;
    },
    deleteTask: (state: TasksType, action: PayloadAction<{ uuid: string }>) => {
      onAuthStateChanged(auth, (user) => {
        user && removeUserTask(user.uid, action.payload.uuid);
      });
      state.tasks = state.tasks.filter(
        (task: Task) => task.uuid !== action.payload.uuid
      );
    },
  },
});

export const { addNewTask, checkSubtask, editTask, moveTask, deleteTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
