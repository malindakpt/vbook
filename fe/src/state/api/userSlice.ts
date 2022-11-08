import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../../types/User";
import { config } from "../../config";
import { PopupType } from "../../enum/popup.type";
import { LoginUIMode } from "../../enum/login.ui.mode";
import { initialState } from "../appState";
import { changePassword, logout, sendResetCode, signIn, signUp } from "../thunks";


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

export const userSlice = createSlice({
  name: "blogData",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    changeLoginMode: (state, action: PayloadAction<LoginUIMode>) => {
      state.login.mode = action.payload;
    },
    showPopup: (
      state,
      action: PayloadAction<{ type: PopupType; message: string }>
    ) => {
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

export const { showPopup, hidePopup, changeLoginMode, setUser } = userSlice.actions;
