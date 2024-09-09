import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauthGenerator } from "./assets/baseQueryWithReauthGenerator.api";
import { IDBPicture, IRTKQueryUploadPicture } from "@/types/redux/auth";

export const filesApi = createApi({
    reducerPath: 'filesApi',
    baseQuery: baseQueryWithReauthGenerator("files"),
    tagTypes: ["files"],
    endpoints: (builder) => ({
      uploadPicture: builder.mutation<IDBPicture, IRTKQueryUploadPicture>({
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
    })
  })

  
export const { useUploadPictureMutation } = filesApi;  