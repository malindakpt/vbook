import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { User } from "../../types/User";
import { getCookie } from "typescript-cookie";
import jwtDecode from "jwt-decode";
import { config } from "../../config";
import { PopupType } from "../../enum/popup.type";
import { LoginUIMode } from "../../enum/login.ui.mode";

export interface InitialState {
  user: User | null;
  login: {
    mode: LoginUIMode;
    signUp: {
      loading: boolean;
    };
    signIn: {
      loading: boolean;
    };
    forgotPassword: {
      loading: boolean;
      codeSent: boolean;
    };
    changePassword: {
      loading: boolean;
      identifier: string;
    };
  };
  popup: {
    message: string;
    isOpen: boolean;
    type: PopupType;
  };
}
const initialState: InitialState = {
  user: null,
  login: {
    mode: LoginUIMode.SIGN_IN,
    signUp: {
      loading: false,
    },
    signIn: {
      loading: false,
    },
    forgotPassword: {
      loading: false,
      codeSent: false,
    },
    changePassword: {
      loading: false,
      identifier: '',
    },
  },
  popup: {
    message: "",
    isOpen: false,
    type: PopupType.info,
  },
};
axios.defaults.withCredentials = true;
axios.defaults.baseURL = config.serverUrl;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.post(`user/refreshToken`);
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
    const response = await axios.post(`/user/signUp`, user);
    return response.data;
  }
);

export const refreshToken = createAsyncThunk(
  "user/refreshToken",
  // if you type your function argument here
  async (thunkAPI) => {
    const response = await axios.post(`/user/refreshToken`);
    return response.data;
  }
);

export const signIn = createAsyncThunk(
  "user/signIn",
  // if you type your function argument here
  async (args: { identifier: string; password: string }, thunkAPI) => {
    try{
    const response = await axios.post(`/user/signIn`, args);
    return response.data;
    }catch(e: any){
      thunkAPI.dispatch(showPopup({type: PopupType.error, message: (e as AxiosError)?.response?.data as string}));
    }
  }
);

export const sendResetCode = createAsyncThunk(
  "user/sendResetCode",
  // if you type your function argument here
  async (args: { identifier: string }, thunkAPI) => {
    const response = await axios.post(`/user/sendResetCode`, args);
    return response.data;
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  // if you type your function argument here
  async (
    args: { resetCode: string; identifier: string; password: string },
    thunkAPI
  ) => {
    const response = await axios.post(`/user/changePassword`, args);
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
    changeLoginMode: (state, action: PayloadAction<LoginUIMode>) => {
      state.login.mode = action.payload;
    },
    showPopup: (state, action: PayloadAction<{type: PopupType, message: string}>) => {
      state.popup.isOpen = true;
      state.popup.type = action.payload.type;
      state.popup.message = action.payload.message;
    },
    hidePopup: (state) => {
      state.popup.isOpen = false;
    },
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
      state.login.signUp.loading = false;
      state.user = action.payload;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.login.signUp.loading = true;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.login.signUp.loading = true;
    });

    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
      state.login.signIn.loading = false;
    });
    builder.addCase(signIn.pending, (state, action) => {
      state.login.signIn.loading = true;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.login.signIn.loading = false;
    });

    builder.addCase(sendResetCode.fulfilled, (state, action) => {
      state.login.forgotPassword.loading = false;
      state.login.changePassword.identifier = action.meta.arg.identifier;
      state.login.mode = LoginUIMode.CHANGE_PASSWORD;
    });
    builder.addCase(sendResetCode.pending, (state, action) => {
      state.login.forgotPassword.loading = true;
    });
    builder.addCase(sendResetCode.rejected, (state, action) => {
      state.login.forgotPassword.loading = false;
    });


    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.login.changePassword.loading = false;
      state.login.mode = LoginUIMode.SIGN_IN;
    });
    builder.addCase(changePassword.pending, (state, action) => {
      state.login.changePassword.loading = true;
    });
    builder.addCase(changePassword.rejected, (state, action) => {
      state.login.changePassword.loading = false;
    });


    builder.addCase(logout.fulfilled, (state, action) => {
      console.log(action.payload);
      // TODO: clear all cookies
      state.user = null;
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

export const { showPopup, hidePopup, changeLoginMode } = userSlice.actions;
