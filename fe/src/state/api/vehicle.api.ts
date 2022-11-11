// Need to use the React-specific entry point to allow generating React hooks
import {
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { build } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/cacheLifecycle";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { resolve } from "path";
import type { BEResponse } from "../../../../be/src/types/BEResponse";
import { User } from "../../types/User";
import { Vehicle } from "../../types/Vehicle";

// Define a service using a base URL and expected endpoints
export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  // reducerPath: ,
  // reducer: store.reducer,
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/vehicle" }),

  // extractRehydrationInfo(action, { reducerPath }) {
  //   if (action.type === REHYDRATE) {
  //     return action.payload[reducerPath]
  //   }
  // },

  endpoints: (build) => ({
    getAllUsers: build.query<User, void>({
      query: () => `add`,
      // transformResponse: (response: { data: User }, meta, arg) => response.data,
    }),

    createVehicle: build.mutation({
      queryFn: async (
        arg: any,
        queryApi: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<
          QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
        >
      ) => {
        try {
          const response = await axios.post(`/vehicle/create`, arg);
          return response.data;
        } catch (e) {
          throw new Error();
        }
      },
      async onQueryStarted(
        arg,
        {
          dispatch,
          getState,
          extra,
          requestId,
          queryFulfilled,
          getCacheEntry,
          // updateCachedData,
        }
      ) {
        console.log("query started");
      },
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
          // updateCachedData,
        }
      ) {
        console.log("fullState", getState());
      },
    }),

    readVehicle: build.query({
      queryFn: async (
        id: string,
        queryApi: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<
          QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
        >
      ) => await axios.post(`/vehicle/${id}`),
    }),

    readVehicles: build.query({
      queryFn: async (
        arg: any,
        queryApi: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<
          QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
        >
      ) => {
        try {
          const response = await axios.post(`/vehicles`, arg);
          return response.data;
        } catch (e) {
          throw new Error();
        }
      },
    }),

    signUp: build.mutation<User, Partial<User> & Pick<User, "id">>({
      // note: an optional `queryFn` may be used in place of `query`
      query: ({ id, ...patch }) => ({
        url: `user/signUp`,
        method: "POST",
        body: patch,
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: User }, meta, arg) => {
        return response.data;
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

    resetPassword: build.mutation<BEResponse, string>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (identifier) => ({
        url: `user/reset`,
        method: "POST",
        body: {
          identifier,
        },
      }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: BEResponse, meta, arg) => {
        console.log("transformResponse");
        return response.data;
      },

      // invalidatesTags: ['User'],
      // onQueryStarted is useful for optimistic updates
      // The 2nd parameter is the destructured `MutationLifecycleApi`
      async onQueryStarted(
        arg,
        { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }
      ) {
        console.log("Cache entry onQueryStarted");
      },
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
      ) {
        console.log("Cache entry added");
      },
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useReadVehiclesQuery,
  useReadVehicleQuery,
  useGetAllUsersQuery,
  useSignUpMutation,
  useCreateVehicleMutation,
  useResetPasswordMutation,
  reducer: vehicleReducer,
  reducerPath: vehicleReducerPath,
} = vehicleApi;
