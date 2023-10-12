import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { ref, remove, set, update } from "firebase/database";
import { auth, database } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";

const initialState: TasksType = {
  tasks: [],
};

const addUserTasksData = (userId: string, newTask: Task) => {
  const tasksRef = ref(database, "users/" + userId + "/tasks/" + newTask.uuid);
  set(tasksRef, {
    ...newTask,
  });
};
const updateUserTaskData = (userId: string, updatedTask: Task) => {
  const updates: any = {};
  const index = "users/" + userId + "/tasks/" + updatedTask.uuid;
  updates[index] = updatedTask;

  return update(ref(database), updates);
};

const removeUserTask = (userId: string, uuid: string) => {
  remove(ref(database, "users/" + userId + "/tasks/" + uuid));
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state: TasksType, action: PayloadAction<AddNewTaskAction>) => {
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
      checkedTasks.forEach((checkedTask) => {
        onAuthStateChanged(auth, (user) => {
          user && updateUserTaskData(user.uid, checkedTask);
        });
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
        onAuthStateChanged(auth, (user) => {
          user && updateUserTaskData(user.uid, updatedTask);
        });
        if (task.uuid === action.payload.taskUuid) {
          return updatedTask;
        }
        return task;
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
        onAuthStateChanged(auth, (user) => {
          user && updateUserTaskData(user.uid, newTaskPos);
        });
        if (task.uuid === action.payload.taskUuid) return newTaskPos;
        return task;
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
