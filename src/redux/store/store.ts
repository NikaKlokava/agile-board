import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../reducers/boardsSlice";
import activeBoardReducer from "../reducers/activeBoardSlice";
import tasksReducer from "../reducers/tasksSlice";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    activeBoard: activeBoardReducer,
    tasks: tasksReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
