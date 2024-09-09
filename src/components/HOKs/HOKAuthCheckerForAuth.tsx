import { useDispatch, useSelector } from "react-redux";
import classes from "./HOKAuthChecker.module.scss";
import { AppDispatch, RootState } from "../../redux/store";
import { setTokens, setUser } from "../../redux/slice/authSlice";
import { useEffect } from "react";
import { useAuthMeMutation } from "../../redux/api/auth.api";
import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import { useAuthCheck } from "../hooks/HOKs/useAuthCheck";

export interface IPropsChildren {
  children: JSX.Element;
}

export default function () {
  let { isSuccessLogIn, isErrorLogIn, user, access_token } = useAuthCheck();

  if (isErrorLogIn || (!user && !access_token)) {
    return <Auth />;
  } else if (isSuccessLogIn || user) {
    return <Navigate to="/profile" />;
  } else {
    return <>Загрузка...</>;
  }

}
