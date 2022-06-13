import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import appReducer from '../state/appSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import apiReducer from '../features/counter/apiSlice';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfigApp = {
  key: 'app',
  storage
};

const persistConfigApi = {
  key: 'api',
  storage
};

const persistedAppReducer = persistReducer(persistConfigApp, appReducer);
const persistedApiReducer = persistReducer(persistConfigApi, apiReducer);

export const store = configureStore({
  reducer: {
    app: persistedAppReducer,
    api: persistedApiReducer
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
});

// export const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
