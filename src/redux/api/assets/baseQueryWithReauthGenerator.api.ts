import { BaseQueryApi, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { FetchArgsWithReauth, IJWTTokensRefresh } from "../../../types/redux/auth";
import { RootState } from "../../store";
import { removeUser, setTokens } from "../../slice/authSlice";

import config from "@/config/config";

function setTokenToHeader(args: FetchArgsWithReauth, api: BaseQueryApi) {
    let {
      headers = new Headers()
    } = args;
    
    let token = (api.getState() as RootState).authSlice.tokens?.access_token;
  
    if (token && headers instanceof Headers) {
      headers.set('Authorization', `Bearer ${token}`)
    } 
    else if (headers instanceof Object) {
      (headers as any).Authorization = `Bearer ${token}`
    }

    return {
      ...args,
      headers
    };
}

const baseQuery = fetchBaseQuery(
  { 
    baseUrl: `${config.http.url.core}`
  }
);

export const baseQueryWithReauthGenerator = (pathCore: string = "") => {
  return async (
    args: FetchArgsWithReauth,
    api: BaseQueryApi,
    extraOptions: {
      [key: string]: any
    }
  ) => {
    try {
      let {  
        authLogic
      } = args;

      args.url = `${pathCore}/${args.url}` 

      if (authLogic) {
        args = setTokenToHeader(args, api)
      }

      // Обработка отправки токена, если запрос в этом нуждается;
      let responseBaseQuery = await baseQuery(args, api, extraOptions);

      if (authLogic && responseBaseQuery.error?.status == 401) {
        let responseRefreshToken = await baseQuery(
          {
            url: 'user/refresh_token',
            credentials: "include"
          }, 
          api,
          extraOptions
        );

        if (responseRefreshToken?.data) {
          let tokens = responseRefreshToken.data as IJWTTokensRefresh;
          api.dispatch(setTokens(tokens.data.tokens))

          args = setTokenToHeader(args, api)
          responseBaseQuery = await baseQuery({...args, credentials: "include"}, api, extraOptions);
          
        } else {
          api.dispatch(removeUser())

          throw "Invalid token"
        }
      }

      return responseBaseQuery
    } catch (error) {
      throw error
    }
  }
}