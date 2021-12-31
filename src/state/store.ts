import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './user/userSlice';
import metaReducer from './meta/metaSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    meta: metaReducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
