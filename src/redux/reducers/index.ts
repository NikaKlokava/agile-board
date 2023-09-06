import { combineReducers } from "redux";
import { activeBoardReducer } from "./activeBoardReducer";
import { boardsReducer } from "./boardsReducer";
import { tasksReducer } from "./tasksReducer";

export const rootReducer = combineReducers({
  boards: boardsReducer,
  tasks: tasksReducer,
  activeBoard: activeBoardReducer,
});
