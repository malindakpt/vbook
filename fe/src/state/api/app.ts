import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/User";
import { RootState } from "../store";

interface InitialState {
  user: User | null;
}
const initialState: InitialState = {
  user: null,
};
export type AppStateType = typeof initialState;

const slice = createSlice({
  name: "test",
  initialState,
  reducers: {
    //   increment: (state, action: PayloadAction<number>) => state + action.payload,
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { login } = slice.actions;
export const { reducer: appReducer } = slice;
export const user = (state: RootState) => state.appReducer.user;
