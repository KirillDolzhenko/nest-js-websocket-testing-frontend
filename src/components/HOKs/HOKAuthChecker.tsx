import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../hooks/HOKs/useAuthCheck";
import { IPropsChildren } from "@/types/props/props";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setChatsDirect, setChatsGroup } from "@/redux/slice/chatSlice";

export default function ({ children }: IPropsChildren) {
  let { isSuccessLogIn, isErrorLogIn, user, access_token } = useAuthCheck();

  if (user && access_token) {
    return <>{children}</>;
  } else if (isErrorLogIn || (!user && !access_token)) {
    return <Navigate to="/auth" />;
  } else {
    return <>Загрузка...</>;
  }
}
