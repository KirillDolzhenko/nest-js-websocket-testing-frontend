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
            return response.data
          },
          invalidatesTags: ["groupApi"],
          transformErrorResponse: (response) => {
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
          providesTags: ["groupApi"]
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
            return response.data
          },
    })
  })
})

export const { 
  useCreateGroupMutation,
  useGetAllGroupsQuery,
  useGetMessagesGroupMutation
} = groupApi;
  



