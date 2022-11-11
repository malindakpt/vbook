import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User } from "../types/User";
import { clearAllCookies, showErrorFromResponse } from "../util/helper";

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
  async (args: { identifier: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`/user/signIn`, args);
      return response.data;
    } catch (e: any) {
      showErrorFromResponse(e, thunkAPI.dispatch);
      throw new Error();
    }
  }
);

export const sendResetCode = createAsyncThunk(
  "user/sendResetCode",
  async (args: { identifier: string }, thunkAPI) => {
    try {
      const response = await axios.post(`/user/sendResetCode`, args);
      return response.data;
    } catch (e) {
      showErrorFromResponse(e, thunkAPI.dispatch);
      throw new Error();
    }
  }
);

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (
    args: { resetCode: string; identifier: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`/user/changePassword`, args);
      return response.data;
    } catch (e) {
      showErrorFromResponse(e, thunkAPI.dispatch);
      throw new Error();
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async (args: void, thunkAPI) => {
    try {
      const response = await axios.post(`/user/logout`);
      clearAllCookies();
      return response.data;
    } catch (e) {
      showErrorFromResponse(e, thunkAPI.dispatch);
      throw new Error();
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/signIn",
  async (args: void, thunkAPI) => {
    try {
      const response = await axios.post(`/user/all`, {test: 123});
      console.log(response.data);
      return response.data;
    } catch (e) {
      showErrorFromResponse(e, thunkAPI.dispatch);
      throw new Error();
    }
  }
);
