import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/User";
import { getCookie } from "typescript-cookie";
import jwtDecode from "jwt-decode";

export interface InitialState {
  user: User | null;
  isResetCodeSent: boolean;
}
const initialState: InitialState = {
  user: null,
  isResetCodeSent: false,
};
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(
          `http://localhost:3600/user/refreshToken`
        );
        return axios(originalRequest);
      } catch (e) {
        console.log(e);
      } 
    }
    return Promise.reject(error);
  }
);

// const axios = axiosA.create({
//   withCredentials: true
// })

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  // if you type your function argument here
  async (thunkAPI) => {
    const token = getCookie("access-token");

    if (!token) {
      return null;
    }
    const user = jwtDecode(token);
    return user as User;
  }
);

export const signUp = createAsyncThunk(
  "users/signUp",
  // if you type your function argument here
  async (user: User, thunkAPI) => {
    const response = await axios.post(
      `http://localhost:3600/user/signUp`,
      user
    );
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  "users/refreshToken",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(
      `http://localhost:3600/user/refreshToken`
    );
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "users/signIn",
  // if you type your function argument here
  async (args: { identifier: string; password: string }, thunkAPI) => {
    const response = await axios.post(
      `http://localhost:3600/user/signIn`,
      args
    );
    return response.data;
  }
);

export const resetPassword = createAsyncThunk(
  "users/resetPassword",
  // if you type your function argument here
  async (args: { identifier: string}, thunkAPI) => {
    const response = await axios.post(
      `http://localhost:3600/user/resetPassword`,
      args
    );
    return response.data;
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(`http://localhost:3600/user/logout`);
    return response.data;
  }
);

export const getAllUsers = createAsyncThunk(
  "users/signIn",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(`http://localhost:3600/user/all`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    //   receivedAll: {
    //     reducer(
    //       state,
    //       action: PayloadAction<Page[], string, { currentPage: number }>
    //     ) {
    //       state.all = action.payload
    //       state.meta = action.meta
    //     },
    //     prepare(payload: Page[], currentPage: number) {
    //       return { payload, meta: { currentPage } }
    //     },
    //   },
  },
  extraReducers: (builder) => {
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = null;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isResetCodeSent = action.payload;
    });
    //   .addCase(incrementBy, (state, action) => {
    //     // action is inferred correctly here if using TS
    //   })
    //   // You can chain calls, or have separate `builder.addCase()` lines each time
    //   .addCase(decrement, (state, action) => {})
    //   // You can match a range of action types
    //   .addMatcher(
    //     isRejectedAction,
    //     // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
    //     (state, action) => {}
    //   )
    //   // and provide a default case if no other handlers matched
    builder.addDefaultCase((state, action) => {});
  },
});
