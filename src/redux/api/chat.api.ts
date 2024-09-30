import { createApi } from '@reduxjs/toolkit/query/react'
import { IDBLogOutResponse, IDBUser, IDBUserWithTokens, IRTKQueryLogIn, IRTKQuerySearchUsers, IRTKQuerySignUp, IRTKQueryUpdateProfile } from '../../types/redux/auth';
import { baseQueryWithReauthGenerator } from './assets/baseQueryWithReauthGenerator.api';
import { IDBContactDirect, IDBGetMessageDirect, IDBGroup, IRTKCreateGroup, IRTKGetMessageDirect } from '@/types/redux/message';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: baseQueryWithReauthGenerator("chat"),
    tagTypes: ["chatApi"],
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
      getMessagesDirect: builder.mutation<IDBGetMessageDirect, IRTKGetMessageDirect>({
        query: (info) => ({
          url: `messages/direct`,
          method: "POST",
          authLogic: true,
          body: {
            ...info
          }
        }),
        transformResponse: (response: {
          data: IDBGetMessageDirect
        }) => {
          return response.data
        },
        transformErrorResponse: (response) => {
            return response
        },
      }),
      getContactsDirect: builder.query<IDBContactDirect[], void>({
        query: () => ({
          url: `contacts/direct`,
          method: "GET",
          authLogic: true
        }),
        transformResponse: (response: {
          data: IDBContactDirect[]
        }) => {
          return response.data
        },
        providesTags: ["chatApi"],
        transformErrorResponse: (response) => {
            console.log(response)

            return response
        },
      })
    })
  })

export const { 
  useGetMessagesDirectMutation,
  useGetContactsDirectQuery,
  // useCreateGroupMutation
} = chatApi;
  