// Need to use the React-specific entry point to allow generating React hooks
import {
  BaseQueryApi,
  QueryReturnValue,
} from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { MaybePromise } from "@reduxjs/toolkit/dist/query/tsHelpers";
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { Vehicle } from "../../types/Vehicle";

// Define a service using a base URL and expected endpoints
export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  tagTypes: ['Vehicle'],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/vehicle" }),
  endpoints: (build) => ({
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

    updateVehicle: build.mutation({
      queryFn: async (
        args: Partial<Vehicle>,
        queryApi: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<
          QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
        >
      ) => await axios.post(`/vehicle/update`, args),
      invalidatesTags: ['Vehicle'],
    }),

    deleteVehicle: build.mutation({
      queryFn: async (
        id: number,
        queryApi: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<
          QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
        >
      ) => await axios.post(`/vehicle/delete/${id}`),
      invalidatesTags: ['Vehicle'],
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
      providesTags: ['Vehicle']
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
      ) =>  await axios.post(`/vehicles/list`, arg),
      providesTags: ['Vehicle']
    })
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateVehicleMutation,
  useReadVehiclesQuery,
  useReadVehicleQuery,
  useCreateVehicleMutation,
 useDeleteVehicleMutation
} = vehicleApi;
