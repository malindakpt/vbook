import {
  createApi,
  fetchBaseQuery,
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
        arg: Vehicle,
      ) => await axios.post(`/vehicle/create`, arg)
    }),

    updateVehicle: build.mutation({
      queryFn: async (
        args: Partial<Vehicle>,
      ) => await axios.post(`/vehicle/update`, args),
      invalidatesTags: ['Vehicle'],
    }),

    deleteVehicle: build.mutation({
      queryFn: async (
        id: number,
      ) => await axios.post(`/vehicle/delete/${id}`),
      invalidatesTags: ['Vehicle'],
    }),

    readVehicle: build.query({
      queryFn: async (
        id: string,
      ) => await axios.post(`/vehicle/${id}`),
      providesTags: ['Vehicle']
    }),

    readVehicles: build.query({
      queryFn: async (
        arg: Partial<Vehicle>,
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
