import { BlobServiceClient } from "@azure/storage-blob";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { config } from "../../config";
import { Vehicle } from "../../types/Vehicle";
import { dataURLtoFile } from "../../util/helper";

const blobServiceClient = new BlobServiceClient(config.azureSAS);
const containerName = config.azureImageContainer;
const containerClient = blobServiceClient.getContainerClient(containerName);

// Define a service using a base URL and expected endpoints
export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  tagTypes: ["Vehicle"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/vehicle" }),
  endpoints: (build) => ({
    createVehicle: build.mutation({
      queryFn: async (arg: { veh: Vehicle; img: Blob | undefined }) => {
        const vehicle = await axios.post(`/vehicle/create`, arg.veh);

        if (arg.img) {
          const imageName = `v-${vehicle.data.id}-0.jpg`;
          const file = dataURLtoFile(arg.img, imageName);

          const blockBlobClient = containerClient.getBlockBlobClient(imageName);
          await blockBlobClient.uploadBrowserData(file);
        }
        return vehicle;
      },
      invalidatesTags: ["Vehicle"],
    }),

    updateVehicle: build.mutation({
      queryFn: async (arg: {
        veh: Partial<Vehicle>;
        img: Blob | undefined;
      }) => {
        const vehicle = await axios.post(`/vehicle/update`, arg.veh);

        if (arg.img) {
          const imageName = `v-${vehicle.data.id}-0.jpg`;
          const file = dataURLtoFile(arg.img, imageName);

          const blockBlobClient = containerClient.getBlockBlobClient(imageName);
          await blockBlobClient.uploadBrowserData(file);
        }
        return vehicle;
      },
      invalidatesTags: ["Vehicle"],
    }),

    deleteVehicle: build.mutation({
      queryFn: async (id: number) => await axios.post(`/vehicle/delete/${id}`),
      invalidatesTags: ["Vehicle"],
    }),

    readVehicle: build.query({
      queryFn: async (id: string) => await axios.post(`/vehicle/${id}`),
      providesTags: ["Vehicle"],
    }),

    readVehicles: build.query({
      queryFn: async (arg: Partial<Vehicle>) =>
        await axios.post(`/vehicle/list`, arg),
      providesTags: ["Vehicle"],
    }),

    searchVehicles: build.query({
      queryFn: async (arg: { key: string}) =>
        await axios.post(`/vehicle/search`, arg),
      providesTags: ["Vehicle"],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useUpdateVehicleMutation,
  useReadVehiclesQuery,
  useReadVehicleQuery,
  useCreateVehicleMutation,
  useDeleteVehicleMutation,
  useLazySearchVehiclesQuery,
  useSearchVehiclesQuery
} = vehicleApi;
