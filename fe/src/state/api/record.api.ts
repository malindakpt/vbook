import { BlobServiceClient } from "@azure/storage-blob";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { config } from "../../config";
import { Record } from "../../types/Record";
import { dataURLtoFile } from "../../util/helper";

const blobServiceClient = new BlobServiceClient(config.azureSAS);
const containerName = config.azureImageContainer;
const containerClient = blobServiceClient.getContainerClient(containerName);

// Define a service using a base URL and expected endpoints
export const recordApi = createApi({
  reducerPath: "recordApi",
  tagTypes: ["Record"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3600/record" }),
  endpoints: (build) => ({
    createRecord: build.mutation({
      queryFn: async (arg: { rec: Record; img: Blob | undefined }) => {
        const record = await axios.post(`/record/create`, arg.rec);

        if (arg.img) {
          const imageName = `${record.data.id}-0.jpg`;
          const file = dataURLtoFile(arg.img, imageName);

          const blockBlobClient = containerClient.getBlockBlobClient(imageName);
          await blockBlobClient.uploadBrowserData(file);
        }
        return record;
      },
      invalidatesTags: ["Record"],
    }),

    updateRecord: build.mutation({
      queryFn: async (arg: { rec: Partial<Record>; img: Blob | undefined }) => {
        const record = await axios.post(`/record/update`, arg.rec);

        if (arg.img) {
          const imageName = `${record.data.id}-0.jpg`;
          const file = dataURLtoFile(arg.img, imageName);

          const blockBlobClient = containerClient.getBlockBlobClient(imageName);
          await blockBlobClient.uploadBrowserData(file);
        }
        return record;
      },
      invalidatesTags: ["Record"],
    }),

    deleteRecord: build.mutation({
      queryFn: async (id: number) => await axios.post(`/record/delete/${id}`),
      invalidatesTags: ["Record"],
    }),

    readRecord: build.query({
      queryFn: async (id: string) => {
        const result = await axios.post(`/record/${id}`);
        return result;
      },
      providesTags: ["Record"],
    }),

    readRecords: build.query({
      queryFn: async (args: Partial<Record>) => {
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
