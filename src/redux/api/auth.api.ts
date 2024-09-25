import { createApi } from '@reduxjs/toolkit/query/react'
import { IDBLogOutResponse, IDBUser, IDBUserWithTokens, IRTKMutationGetAllUsers, IRTKQueryLogIn, IRTKQuerySearchUsers, IRTKQuerySignUp, IRTKQueryUpdateProfile } from '../../types/redux/auth';
import { baseQueryWithReauthGenerator } from './assets/baseQueryWithReauthGenerator.api';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauthGenerator("user"),
    tagTypes: ["userAuth"],
    endpoints: (builder) => ({
      authMe: builder.mutation<IDBUserWithTokens, void>({
        query: () => ({
          url: `auth_me`,
          method: "POST",
          authLogic: true,
        }),
        transformResponse: (response: {
          data: IDBUserWithTokens
        }) => response.data,
        transformErrorResponse: (response) => {
            console.log(response)

            return response
        },
      }),
      logIn: builder.mutation<IDBUserWithTokens, IRTKQueryLogIn>({
        query: ({email, password}) => ({
          url: `login`,
          method: "POST",
          body: {
            email,
            password
          },
          credentials: "include"
        }),
        transformResponse: (response: {
          data: IDBUserWithTokens
        }) => response.data,
        transformErrorResponse: (response) => {
            console.log(response)
        
            return response
        },
      }),
      signUp: builder.mutation<IDBUserWithTokens, IRTKQuerySignUp>({
        query: ({username, email, password}) => ({
          url: `signup`,
          method: "POST",
          body: {
            username,
            email,
            password  
          },
          credentials: "include"
        }),
        transformResponse: (response: {
          data: IDBUserWithTokens
        }) => response.data
      }),
      updateProfile: builder.mutation<IDBUser, IRTKQueryUpdateProfile>({
        query: ({username, email, picColor, picUrl}) => ({
          url: ``,
          method: "PATCH",
          authLogic: true,
          body: {
            username,
            email, 
            picColor,
            picUrl
          }
        }),
        transformResponse: (response: {
          data: IDBUser
        }) => response.data,
      }),
      removePicProfile: builder.mutation<IDBUser, void>({
        query: () => ({
          url: `pic_profile`,
          method: "DELETE",
          authLogic: true,
        }),
        transformResponse: (response: {
          data: IDBUser
        }) => response.data,
        transformErrorResponse: (response) => {
            return response
        },
      }),
      logOut: builder.mutation<boolean, void>({
        query: () => ({
          url: `logout`,
          method: "POST",
          authLogic: true,
          credentials: "include"
        }),
        transformResponse: (response: IDBLogOutResponse) => response.data.success,
        transformErrorResponse: (response) => {
            return response
        },
      }),
      searchUsers: builder.mutation<IDBUser[], IRTKQuerySearchUsers>({
        query: ({query}) => ({
          url: `search`,
          method: "POST",
          authLogic: true,
          params: {
            query
          }
        }),
        transformResponse: (response: {
          data: IDBUser[]
        }) => response.data,
        transformErrorResponse: (response) => {
            return response
        },
      }),
      getAllUsers: builder.mutation<IDBUser[], IRTKMutationGetAllUsers | void>({
        query: ({arrId} = {arrId: []}) => {
          console.log(arrId)

          return {
          url: `contacts/all`,
          method: "POST",
          authLogic: true,
          body: {
            arrId
          }
        }},
        transformResponse: (response: {
          data: IDBUser[]
        }) => response.data,
        transformErrorResponse: (response) => {
            return response
        },
      }),
    }),

  })

export const { 
  useAuthMeMutation, 
  useUpdateProfileMutation,
  useLogInMutation, 
  useSignUpMutation,
  useLogOutMutation,
  useSearchUsersMutation,
  useRemovePicProfileMutation,
  useGetAllUsersMutation
} = authApi;
  