/* eslint-disable no-unused-vars */
import {
  BaseQueryApi,
  BaseQueryError,
  BaseQueryExtraOptions,
  QueryReturnValue
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';
import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta
} from '@reduxjs/toolkit/query';

type BaseQuery = any;
type ResultType = any;
type QueryArg = any;

export const PaymentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getData: build.query({
      queryFn: (
        arg: any,
        api: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>
      ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>> => {
        if (Math.random() > 0.5) return { error: 'Too high!' };
        return { data: 'All good!' };
      }
    }),
    addData: build.mutation({
      queryFn: (
        arg: QueryArg,
        api: BaseQueryApi,
        extraOptions: BaseQueryExtraOptions<BaseQuery>,
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>
      ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>> => {
        if (Math.random() > 0.5) return { error: 'Too high!' };
        return { data: 'All good!' };
      }
    })
  })
});
