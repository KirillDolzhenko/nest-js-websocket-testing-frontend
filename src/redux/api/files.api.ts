import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauthGenerator } from "./assets/baseQueryWithReauthGenerator.api";
import { IDBFile, IDBPicture, IRTKQueryUploadFile } from "@/types/redux/auth";

export const filesApi = createApi({
    reducerPath: 'filesApi',
    baseQuery: baseQueryWithReauthGenerator("files"),
    tagTypes: ["files"],
    endpoints: (builder) => ({
      uploadPicture: builder.mutation<IDBPicture, IRTKQueryUploadFile>({
        query: ({ file }) => {
          let formData = new FormData();
          formData.append("file", file);
  
          return {
          url: `images`,
          method: "POST",
          authLogic: true,
          body: formData
        }
      },
        transformResponse: (response: {
          data: IDBPicture
        }) => response.data,
        transformErrorResponse: (response) => {
            return response
        },
      }),
      uploadMessageFile: builder.mutation<IDBFile, IRTKQueryUploadFile>({
        query: ({ file }) => {
          let formData = new FormData();
          formData.append("file", file);
  
          return {
          url: `message/file`,
          method: "POST",
          authLogic: true,
          body: formData
        }
      },
        transformResponse: (response: {
          data: IDBFile
        }) => response.data,
        transformErrorResponse: (response) => {
            return response
        },
      }),
    })
  })

  
export const { 
  useUploadPictureMutation,
  useUploadMessageFileMutation
} = filesApi;  