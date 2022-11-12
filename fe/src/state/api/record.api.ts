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
import { Record } from "../../types/Record";

// Define a service using a base URL and expected endpoints
export const recordApi = createApi({
  reducerPath: "recordApi",
  tagTypes: ["Record"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/record" }),
  endpoints: (build) => ({
    createRecord: build.mutation({
      queryFn: async (
        arg: Record
      ) => await axios.post(`/record/create`, arg),
      invalidatesTags: ["Record"],
    }),

    updateRecord: build.mutation({
      queryFn: async (
        args: Partial<Record>
      ) => await axios.post(`/record/update`, args),
      invalidatesTags: ["Record"],
    }),

    deleteRecord: build.mutation({
      queryFn: async (
        id: number
      ) => await axios.post(`/record/delete/${id}`),
      invalidatesTags: ["Record"],
    }),

    readRecord: build.query({
      queryFn: async (
        id: string
      ) => {
        const result = await axios.post(`/record/${id}`);
        return result;
      },
      providesTags: ["Record"],
    }),

    readRecords: build.query({
      queryFn: async (
        args: Partial<Record>
      ) => {
        const result = await axios.post(`/record/list`, args);
        return result;
      },
      providesTags: ["Record"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useCreateRecordMutation,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
  useReadRecordQuery,
  useReadRecordsQuery,
} = recordApi;
