import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
// import { userReducer, userReducerPath } from "./api/user.api";
import { vehicleReducer, vehicleReducerPath } from "./api/vehicle.api";
import { userSlice } from "./api/userSlice";

const reducer = {
  [vehicleReducerPath]: vehicleReducer,
  app: userSlice.reducer,
  // two: twoSlice.reducer,
};
export const store = configureStore({
  reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(userApi.middleware),
});

// // Infer the `RootState` and `AppDispatch` types from the store itself
// // export type RootState = typeof reducer;
// export type RootState = ReturnType<typeof store.getState>
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
