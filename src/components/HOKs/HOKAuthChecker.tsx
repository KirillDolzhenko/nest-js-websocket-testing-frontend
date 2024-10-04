import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../hooks/HOKs/useAuthCheck";
import { IPropsChildren } from "@/types/props/props";
import WhiteText from "../elements/Inputs/WhiteText/WhiteText";
import classes from "./hok.module.scss";
import Lottie from "lottie-react";
import { lottieFire } from "@/config/lotties";
import ChatPlaceholder from "../pages/Chat/ChatPlaceholder/ChatPlaceholder";

export default function ({ children }: IPropsChildren) {
  const { isSuccessLogIn, isErrorLogIn, user, access_token } = useAuthCheck();

  if (user && access_token) {
    return <>{children}</>;
  } else if (isErrorLogIn || (!user && !access_token)) {
    return <Navigate to="/auth" />;
  } else {
    return (
      <ChatPlaceholder>
        <>
          <mark>Please</mark> wait! Chat is <mark>loading...</mark>
        </>
      </ChatPlaceholder>
    );
  }
}
