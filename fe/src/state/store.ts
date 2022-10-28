import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./api/app";
import { userApi, userReducer, userReducerPath } from "./api/user.api";

const reducer = {
  [userReducerPath]: userReducer,
  appReducer: appReducer,
  // two: twoSlice.reducer,
};
export const store = configureStore({
  reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = typeof reducer;
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
