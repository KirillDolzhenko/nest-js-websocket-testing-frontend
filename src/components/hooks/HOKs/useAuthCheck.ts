import { useLazyAuthMeQuery } from "@/redux/api/auth.api";
import { setTokens, setUser } from "@/redux/slice/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useAuthCheck() {
    const dispatch = useDispatch<AppDispatch>();
    const user = useSelector((state: RootState) => state.authSlice.user);
    const access_token = useSelector(
      (state: RootState) => state.authSlice.tokens?.access_token
    );

    const [
      authMe,
      { isError: isErrorLogIn, isSuccess: isSuccessLogIn, data: dataAuthMe },
    ] = useLazyAuthMeQuery();

    useEffect(() => {
      if (!user && access_token) {
        authMe();
      }
    }, [user, access_token]);

    useEffect(() => {
      if (dataAuthMe) {
        dispatch(setUser(dataAuthMe.user));
        dispatch(setTokens(dataAuthMe.tokens));
      }
    }, [dataAuthMe]);

    return {
        isErrorLogIn,
        isSuccessLogIn,
        user,
        access_token
    }

}