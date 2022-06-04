import { createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getURL } from './apiSliceUtil';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ws.audioscrobbler.com/' }),
  endpoints: (builder) => ({
    searchArtists: builder.query({
      // TODO: If args are undefined, request should not sent to the server
      query: (args: FetchArgs) =>
        getURL(
          'artist.search',
          `artist=${args?.params?.name}&page=${args?.params?.page}&limit=${args?.params?.limit}`
        ),
      transformResponse: (response: { results: any }, meta, arg) => {
        if (arg) {
          const newData = response?.results?.artistmatches?.artist ?? [];
          return {
            arr: [...(arg?.params?.prevData ?? []), ...newData],
            totalSize: response?.results ? response?.results['opensearch:totalResults'] : 0
          };
        } else {
          return {
            arr: [],
            totalSize: 0
          };
        }
      }
    }),
    topAlbums: builder.query({
      query: (args: FetchArgs) =>
        getURL(
          'artist.gettopalbums',
          `mbid=${args?.params?.mbid}&page=${args?.params?.page}&limit=${args?.params?.limit}`
        ),
      transformResponse: (response: { topalbums: any }, meta, arg) => {
        if (arg) {
          const newData = response?.topalbums?.album ?? [];
          const topAlbums = response?.topalbums;

          return {
            arr: [...(arg?.params?.prevData ?? []), ...newData],
            totalSize: topAlbums ? topAlbums['@attr'].total : 0
          };
        } else {
          return {
            arr: [],
            totalSize: 0
          };
        }
      }
    }),
    albumDetails: builder.query({
      query: (args: FetchArgs) =>
        getURL('album.getinfo', `artist=${args?.params?.artist}&album=${args?.params?.album}`),
      transformResponse: (response: { album: any }, meta, arg) => {
        if (arg) {
          const newData = response?.album?.tracks?.track ?? [];

          return {
            arr: [...(arg?.params?.prevData ?? []), ...newData],
            totalSize: 0
          };
        } else {
          return {
            arr: [],
            totalSize: 0
          };
        }
      }
    })
  })
});

export const { useSearchArtistsQuery, useTopAlbumsQuery, useAlbumDetailsQuery } = apiSlice;

export default apiSlice.reducer;
