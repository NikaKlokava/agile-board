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

const store = configureStore({
  reducer: resettableRootReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
