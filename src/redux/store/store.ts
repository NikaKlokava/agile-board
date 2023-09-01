import { legacy_createStore } from "redux";
import { boardsReducer } from "../reducers/boardReducer";

const store = legacy_createStore(boardsReducer);

export default store;

// export type RootState = ReturnType<typeof store.getState>

// export interface RootState {
//     user: UserState;
//     loader: LoaderState;
//   }
// export type AppDispatch = typeof store.dispatch
