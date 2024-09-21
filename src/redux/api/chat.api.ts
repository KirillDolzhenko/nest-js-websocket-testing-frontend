import { createApi } from '@reduxjs/toolkit/query/react'
import { IDBLogOutResponse, IDBUser, IDBUserWithTokens, IRTKQueryLogIn, IRTKQuerySearchUsers, IRTKQuerySignUp, IRTKQueryUpdateProfile } from '../../types/redux/auth';
import { baseQueryWithReauthGenerator } from './assets/baseQueryWithReauthGenerator.api';
import { IDBGetMessageDirect, IRTKGetMessageDirect } from '@/types/redux/auth copy';

export const chatApi = createApi({
    reducerPath: 'chatApi',
    baseQuery: baseQueryWithReauthGenerator("chat"),
    tagTypes: ["chatApi"],
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
          console.log("messge", response)

          return response.data
        },
        transformErrorResponse: (response) => {
            console.log(response)

            return response
        },
      }),
    }),
  })

export const { 
  useGetMessagesDirectMutation,
} = chatApi;
  