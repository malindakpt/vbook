import { configureStore, ThunkAction, Action, createStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/appSlice';
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

const persistConfig = {
  key: 'root',
  storage
};

const persistedAppReducer = persistReducer(persistConfig, counterReducer);
const persistedApiReducer = persistReducer(persistConfig, apiReducer);

export const store = configureStore({
  reducer: {
    counter: persistedAppReducer,
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
