import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";
import { useAuthMeQuery } from "@/redux/api/auth.api";
import { setTokens, setUser } from "@/redux/slice/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuthCheck() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.authSlice.user);
    const access_token = useSelector(
      (state: RootState) => state.authSlice.tokens?.access_token
    );

    const [inited, setInited] = useState<boolean>(false);

    const {
      data: dataAuthMe,
      error,
      isLoading,
      isError: isErrorLogIn,
      isSuccess: isSuccessLogIn,
      refetch,
      
    } = useAuthMeQuery();

    useEffect(() => {
      if (inited === false) {
        setInited(true)
      }
    }, [])

    useEffect(() => {
      if (!user && access_token) {
        refetch();
      } 
    }, [user, access_token]);

    useEffect(() => {
      if (isErrorLogIn) {
      }
    }, [isErrorLogIn])

    useEffect(() => {
      if (dataAuthMe && inited) {
        dispatch(setUser(dataAuthMe.user));
        dispatch(setTokens(dataAuthMe.tokens));
      } else if (inited === false) {
        setInited(true)
      }
    }, [dataAuthMe]);

    return {
        isErrorLogIn,
        isSuccessLogIn,
        user,
        access_token
    }

}