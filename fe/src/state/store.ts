import { configureStore } from '@reduxjs/toolkit'
import { userReducer, userReducerPath } from './api/user.api'

export const store = configureStore({
  reducer: {
    [userReducerPath]: userReducer,
    // two: twoSlice.reducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch