import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import dataReducer from "./dataSlice";

const store = configureStore({
  reducer: {
    // counter1: counterReducer, // state => state.counter1
    data1: dataReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
