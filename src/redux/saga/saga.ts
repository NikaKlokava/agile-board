import { ref, remove, set, update } from "firebase/database";
import { put, call, takeEvery } from "redux-saga/effects";
import { database } from "../../firebase";
import {
  deleteTaskData,
  saveTaskData,
  updateSubtasksData,
  updateTaskData,
} from "../reducers/tasksSlice";

type AnyAction = { type: string; [key: string]: any };

const saveTask = (newTask: Task) => {
  const tasksRef = ref(database, "users/tasks/" + newTask.uuid);
  set(tasksRef, {
    ...newTask,
  });
};

const updateTask = (updatedTask: Task) => {
  const updates: any = {};
  const index = "users/tasks/" + updatedTask.uuid;
  updates[index] = updatedTask;

  return update(ref(database), updates);
};

const updateSubtasks = ({
  taskUuid,
  updatedSubtasks,
}: {
  taskUuid: string;
  updatedSubtasks: SubtasksType;
}) => {
  const updates: any = {};
  const index = "users/tasks/" + taskUuid + "/subtasks/";
  updates[index] = updatedSubtasks;

  return update(ref(database), updates);
};

const deleteTask = (uuid: string) =>
  remove(ref(database, "users/tasks/" + uuid));

const fetchTasksFailure = (payload: unknown) => ({
  type: console.log(payload),
});

function* addUserTaskData({ payload: { newTask } }: AnyAction) {
  try {
    yield call(saveTask, newTask);
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

function* updateUserTaskData({ payload: { updatedTask } }: AnyAction) {
  try {
    yield call(updateTask, updatedTask);
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

function* updateUserSubtasksData({
  payload: { taskUuid, updatedSubtasks },
}: AnyAction) {
  try {
    yield call(updateSubtasks, { taskUuid, updatedSubtasks });
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

function* deleteUserTaskData({ payload: { uuid } }: AnyAction) {
  try {
    yield call(deleteTask, uuid);
  } catch (error) {
    yield put(fetchTasksFailure(error));
  }
}

export function* saveTasksSaga() {
  yield takeEvery(saveTaskData, addUserTaskData);
}

export function* updateTasksSaga() {
  yield takeEvery(updateTaskData, updateUserTaskData);
}

export function* updateSubtasksSaga() {
  yield takeEvery(updateSubtasksData, updateUserSubtasksData);
}

export function* deleteTaskSaga() {
  yield takeEvery(deleteTaskData, deleteUserTaskData);
}
