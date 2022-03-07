// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REHYDRATE } from 'redux-persist';
import { Entity } from '../../dataAPI/entity';
import { getDocumentsWithProps } from '../../dataAPI/firebaseAPI';
// import { Pokemon } from './types';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === REHYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`
    }),
    getPost: builder.query<any, number>({
      // eslint-disable-next-line no-unused-vars
      queryFn: async (arg, queryApi, extraOptions, baseQuery) => {
        try {
          const result = await getDocumentsWithProps(Entity.EXAMS, {});
          const v = {
            data: result
          };
          return v;
        } catch (e) {
          const v = {
            error: e as any
          };
          return v;
        }
        // return new Promise((resolve) => {
        //   resolve({
        //     then: Promise.resolve([])
        //   });
        // });
        // return {
        //   // then: () => {
        //   //   return 'asdasd';
        //   // }
        // };
        // return result;
        // .then((data) => {
        //   return data;
        // })
        // .catch(() => {
        //   return [];
        // });
        // if (arg <= 0) {
        //   return {
        //     error: {
        //       status: 500,
        //       statusText: 'Internal Server Error',
        //       data: 'Invalid ID provided.'
        //     }
        //   };
        // }
        // const post: any = {
        //   id: arg,
        //   name: 'getRandomName()'
        // };
        // return { data: post };
      }
    })
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPokemonByNameQuery, useGetPostQuery } = pokemonApi;
