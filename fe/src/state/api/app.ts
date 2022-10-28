import { AppendOwnerStateReturnType } from "@mui/base/utils/appendOwnerState";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


const initialState = {
  isLoggedIn: false
}
export type AppStateType =  typeof initialState;

const slice = createSlice({
    name: 'test',
    initialState,
    reducers: {
    //   increment: (state, action: PayloadAction<number>) => state + action.payload,
      login: (state, action: PayloadAction<boolean>) => {
       state.isLoggedIn = action.payload;
      }
    },
  })

  export const { login } = slice.actions
  export const { reducer: appReducer } = slice;
  export const isLoggedIn = (state: RootState) => state.appReducer.isLoggedIn;