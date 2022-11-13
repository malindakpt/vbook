import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { PopupType } from "../../enum/popup.type";
import { LoginUIMode } from "../../enum/login.ui.mode";
import { initialState } from "../appState";
import {
  changePassword,
  logout,
  sendResetCode,
  signIn,
  signUp,
} from "../thunks";


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
    builder.addDefaultCase((state, action) => {});
  },
});

export const { showPopup, hidePopup, changeLoginMode, setUser } =
  userSlice.actions;
