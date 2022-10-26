// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { User } from '../../../../server/src/models/user/user'
// import { REHYDRATE } from 'redux-persist'

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3600/' }),

  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },

  endpoints: (build) => ({
    getAllUsers: build.query<User, void>({
        query: () => `users/all`,
        // transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),



    getUser: build.query<User, {identifier: string, password: string}>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({identifier, password}) => ({ url: `user/getUser`, body: {
        identifier, password
      },   method: 'POST' }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: User }, meta, arg) => response.data,
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
      // The 2nd parameter is the destructured `QueryLifecycleApi`
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
      // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
          updateCachedData,
        }
      ) {},
    }),





    // @ts-ignore
    signUp: build.mutation<User, Partial<User> & Pick<User, 'id'>>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `user/signUp`,
        method: 'POST',
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: User }, meta, arg) => {
        return response.data
      },
      // invalidatesTags: ['User'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {},
      // The 2nd parameter is the destructured `MutationCacheLifecycleApi`
      async onCacheEntryAdded(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          cacheEntryRemoved,
          cacheDataLoaded,
          getCacheEntry,
        }
      ) {},
    }),
  }),
})

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllUsersQuery, useSignUpMutation, useLazyGetUserQuery, reducer: userReducer, reducerPath: userReducerPath } = userApi;