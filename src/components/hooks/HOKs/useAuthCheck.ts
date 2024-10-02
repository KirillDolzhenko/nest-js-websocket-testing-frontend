import { useAuthMeQuery } from "@/redux/api/auth.api";
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

    const {
      data: dataAuthMe,
      isLoading: isErrorLogIn,
      isSuccess: isSuccessLogIn,
      refetch
    } = useAuthMeQuery();

    useEffect(() => {
      if (!user && access_token) {
        refetch();
        console.log("REFETCHH")
      }
    }, [user, access_token]);

    useEffect(() => {
      if (dataAuthMe) {
        console.log(dataAuthMe)
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