/* eslint-disable no-unused-vars */
import {
  BaseQueryFn,
  BaseQueryApi,
  BaseQueryError,
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

export const PaymentApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/'
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    qf: build.query({
      queryFn: (
        arg: any,
        api: BaseQueryApi,
        extraOptions: {},
        baseQuery: (
          arg: string | FetchArgs
        ) => MaybePromise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>
        // ): MaybePromise<QueryReturnValue<ResultType, BaseQueryError<BaseQuery>>> => {
      ): MaybePromise<QueryReturnValue<any, BaseQueryError<any>>> => {
        if (Math.random() > 0.5) return { error: 'Too high!' };
        return { data: 'All good!' };
      }
    })
    // query: build.query({ query: () => ({ url: '/query', method: 'get' }) })
    // getPost: build.query<Post, number>({
    //   // note: an optional `queryFn` may be used in place of `query`
    //   query: (id) => ({ url: `post/${id}` }),
    //   // Pick out data and prevent nested properties in a hook or selector
    //   transformResponse: (response: { data: Post }, meta, arg) => response.data,
    //   providesTags: (result, error, id) => [{ type: 'Post', id }],
    //   // The 2nd parameter is the destructured `QueryLifecycleApi`
    //   async onQueryStarted(
    //     arg,
    //     { dispatch, getState, extra, requestId, queryFulfilled, getCacheEntry, updateCachedData }
    //   ) {},
    //   // The 2nd parameter is the destructured `QueryCacheLifecycleApi`
    //   async onCacheEntryAdded(
    //     arg,
    //     {
    //       dispatch,
    //       getState,
    //       extra,
    //       requestId,
    //       cacheEntryRemoved,
    //       cacheDataLoaded,
    //       getCacheEntry,
    //       updateCachedData
    //     }
    //   ) {}
    // })
  })
});
