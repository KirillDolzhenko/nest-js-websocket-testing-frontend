import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauthGenerator } from './assets/baseQueryWithReauthGenerator.api';
import { IDBGroup, IDBGroupBasic, IRTKCreateGroup } from '@/types/redux/message';
import { IDBMessage } from '@/types/redux/auth';

export const groupApi = createApi({
    reducerPath: 'groupApi',
    baseQuery: baseQueryWithReauthGenerator("group"),
    tagTypes: ["groupApi"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        createGroup: builder.mutation<IDBGroup, IRTKCreateGroup>({
          query: ({title, members}) => ({
            url: ``,
            method: "POST",
            authLogic: true,
            body: {
              title, 
              members
            }
          }),
          transformResponse: (response: {
            data: IDBGroup
          }) => {
            console.log("group", response)

            return response.data
          },
          invalidatesTags: ["groupApi"],
          transformErrorResponse: (response) => {
              console.log(response)

              return response
          },
        }),
        getAllGroups: builder.query<IDBGroupBasic[], void>({
          query: () => ({
            url: `all`,
            method: "GET",
            authLogic: true
          }),
          transformResponse: (response: {
            data: IDBGroupBasic[]
          }) => {

            return response.data
          },
          providesTags: ["groupApi"],
          transformErrorResponse: (response) => {
              console.log(response)

              return response
          },
        }),
        getMessagesGroup: builder.mutation<IDBMessage[], string>({
          query: (id) => ({
            url: `messages/${id}`,
            method: "GET",
            authLogic: true
          }),
          transformResponse: (response: {
            data: IDBMessage[]
          }) => {
            // console.log("contacts", response)
  
            return response.data
          },
          transformErrorResponse: (response) => {
            console.log(response)

            return response
      },
    })
  })
})

export const { 
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetMessagesGroupMutation
} = groupApi;
  



