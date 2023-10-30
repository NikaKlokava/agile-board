import {
  Action,
  AnyAction,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import boardsReducer from "../reducers/boardsSlice";
import activeBoardReducer from "../reducers/activeBoardSlice";
import tasksReducer from "../reducers/tasksSlice";
import createSagaMiddleware from "redux-saga";
import thunk from "redux-thunk";
import {
  deleteTaskSaga,
  saveTasksSaga,
  fetchTasksSaga,
  updateSubtasksSaga,
  updateTasksSaga,
} from "../saga/saga";

const reducers = {
  boards: boardsReducer,
  activeBoard: activeBoardReducer,
  tasks: tasksReducer,
};

const rootReducer = combineReducers(reducers);

const resettableRootReducer = (
  state: ReturnType<typeof rootReducer> | undefined,
  action: AnyAction
) => {
  if (
    action.type === "boards/resetBoards" ||
    action.type === "tasks/resetTasks"
  ) {
    return rootReducer(undefined, action);
  }

  return rootReducer(state, action);
};
const saga = createSagaMiddleware();

const store = configureStore({
  reducer: resettableRootReducer,
  middleware: (gDM) => gDM().concat(saga, thunk),
});

saga.run(fetchTasksSaga);
saga.run(saveTasksSaga);
saga.run(updateTasksSaga);
saga.run(updateSubtasksSaga);
saga.run(deleteTaskSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
