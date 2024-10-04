import { useLogOutMutation } from "@/redux/api/auth.api";
import { removeUser } from "@/redux/slice/authSlice";
import { setChatsDirect, setChatsGroup } from "@/redux/slice/chatSlice";
import { AppDispatch } from "@/redux/store";
import { TUseLogOut } from "@/types/hooks/hooks";
import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

const useLogOut: TUseLogOut = () => {
    const [logOut, {isSuccess, isError, isLoading}] = useLogOutMutation();

    const dispatch = useDispatch<AppDispatch>();

    const func = useCallback(() => {
        logOut();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(removeUser());
            dispatch(setChatsDirect([]));
            dispatch(setChatsGroup([]));
        }
    }, [isSuccess]);

    return {
        func,
        isLoading,
        isSuccess,
        isError
    }
};

export default useLogOut;