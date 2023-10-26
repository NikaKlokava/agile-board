import { ref, remove, set, update } from "firebase/database";
import { database } from "../../firebase";
import { AppThunk } from "../store/store";

export const addUserBoardData =
  (newBoard: BoardType): AppThunk =>
  async () => {
    const boardsRef = ref(database, `users/boards/` + newBoard.uuid);
    try {
      set(boardsRef, {
        ...newBoard,
      });
    } catch (error) {
      console.log(error + "while saving board data");
    }
  };

export const updateUserBoardData =
  (board: UpdateBoardAction): AppThunk =>
  async () => {
    try {
      const updates: any = {};
      const index = "users/boards/" + board.uuid;
      updates[index] = board;
      return update(ref(database), updates);
    } catch (error) {
      console.log(error + "while updating boards");
    }
  };

export const deleteUserBoard =
  (uuid: string): AppThunk =>
  async () => {
    try {
      remove(ref(database, "users/boards/" + uuid));
    } catch (error) {
      console.log(error + "while deleting data");
    }
  };

export const addUserTaskData =
  (newTask: Task): AppThunk =>
  async () => {
    const tasksRef = ref(database, "users/tasks/" + newTask.uuid);

    try {
      set(tasksRef, {
        ...newTask,
      });
    } catch (error) {
      console.log(error + "while saving board data");
    }
  };

export const updateUserTaskData =
  (updatedTask: Task): AppThunk =>
  async () => {
    try {
      const updates: any = {};
      const index = "users/tasks/" + updatedTask.uuid;
      updates[index] = updatedTask;

      return update(ref(database), updates);
    } catch (error) {
      console.log(error + "while saving board data");
    }
  };

export const updateUserSubtasksData =
  (taskUuid: string, updatedSubtasks: SubtasksType): AppThunk =>
  async () => {
    try {
      const updates: any = {};
      const index = "users/tasks/" + taskUuid + "/subtasks/";
      updates[index] = updatedSubtasks;

      return update(ref(database), updates);
    } catch (error) {
      console.log(error + "while saving board data");
    }
  };

export const deleteUserTask =
  (uuid: string): AppThunk =>
  async () => {
    try {
      remove(ref(database, "users/tasks/" + uuid));
    } catch (error) {
      console.log(error + "while deleting data");
    }
  };
