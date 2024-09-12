import { createApi } from '@reduxjs/toolkit/query/react'
import { IDBLogOutResponse, IDBUser, IDBUserWithTokens, IRTKQueryLogIn, IRTKQuerySignUp, IRTKQueryUpdateProfile } from '../../types/redux/auth';
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
        }) => response.data,
        transformErrorResponse: (response) => {
            return response as {
              data: {
                message: string
              }
            }
        },
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
        transformErrorResponse: (response) => {
            return response
        },
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
    }),

  })

export const { 
  useAuthMeMutation, 
  useUpdateProfileMutation,
  useLogInMutation, 
  useSignUpMutation,
  useLogOutMutation,
  useRemovePicProfileMutation
} = authApi;
  