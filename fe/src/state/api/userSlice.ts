import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/User";
import { getCookie } from "typescript-cookie";
import jwtDecode from "jwt-decode";
import { config } from "../../config";
import { PopupType } from "../../enum/popup.type";

export interface InitialState {
  user: User | null;
  isResetCodeSent: boolean;
  popup: {
    message: string;
    isOpen: boolean;
    type: PopupType;
  }
  
}
const initialState: InitialState = {
  user: null,
  isResetCodeSent: false,
  popup: {
    message: '',
    isOpen: false,
    type: PopupType.info

  }
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.serverUrl

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
          `user/refreshToken`
        );
        return axios(originalRequest);
      } catch (e) {
        console.log(e);
      } 
    }
    return Promise.reject(error);
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
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
  "user/signUp",
  // if you type your function argument here
  async (user: User, thunkAPI) => {
    const response = await axios.post(
      `/user/signUp`,
      user
    );
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(
      `/user/refreshToken`
    );
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  // if you type your function argument here
  async (args: { identifier: string; password: string }, thunkAPI) => {
    const response = await axios.post(
      `/user/signIn`,
      args
    );
    return response.data;
  }
);

export const sendResetCode = createAsyncThunk(
  "user/sendResetCode",
  // if you type your function argument here
  async (args: { identifier: string}, thunkAPI) => {
    const response = await axios.post(
      `/user/sendResetCode`,
      args
    );
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  // if you type your function argument here
  async (args: { resetCode: string, identifier: string, password: string}, thunkAPI) => {
    const response = await axios.post(
      `/user/changePassword`,
      args
    );
    return response.data;
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(`/user/logout`);
    return response.data;
  }
);

export const getAllUsers = createAsyncThunk(
  "user/signIn",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(`/user/all`);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    showPopup: (state, action: PayloadAction<PopupType, string>) => {
      state.popup.isOpen = true;
      state.popup.message = action.payload;
      state.popup.type = action.payload
    },
    hidePopup: (state) => {
      state.popup.isOpen = false;
    }
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
    builder.addCase(sendResetCode.fulfilled, (state, action) => {
      console.log(action.payload);
      state.isResetCodeSent = action.payload;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
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

export const { showPopup, hidePopup } = userSlice.actions;
