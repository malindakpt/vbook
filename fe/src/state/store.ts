import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { vehicleApi } from "./api/vehicle.api";
import { userSlice } from "./api/userSlice";
import axios from "axios";
import { config } from "../config";
import { clearAllCookies } from "../util/helper";
import { recordApi } from "./api/record.api";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.serverUrl;

axios.interceptors.request.use(
  (request: any) => {
    request.headers["Content-Type"] = "application/json";
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`user/refreshToken`);
        return axios(originalRequest);
      } catch (e) {
        console.log(e);
        clearAllCookies();
        window.location.reload();
      }
    }
    return Promise.reject(error);
  }
);

const reducer = {
  [vehicleApi.reducerPath]: vehicleApi.reducer,
  [recordApi.reducerPath]: recordApi.reducer,
  app: userSlice.reducer,
  // two: twoSlice.reducer,
};
export const store = configureStore({
  reducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
    .concat(recordApi.middleware)
    .concat(vehicleApi.middleware),
     
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
