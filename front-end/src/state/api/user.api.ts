// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../../server/src/models/user/user'
import { REHYDRATE } from 'redux-persist'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600/' }),

  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath]
    }
  },

  endpoints: (builder) => ({
    getAllUsers: builder.query<User, void>({
        query: () => `users/all`,
        // transformResponse: (response: { data: User }, meta, arg) => response.data,
    })
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, reducer: userReducer, reducerPath: userReducerPath } = userApi;