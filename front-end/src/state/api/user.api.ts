// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../../server/src/models/user/user'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:3600/' }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
        query: () => `users/all`,
    })
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery } = userApi