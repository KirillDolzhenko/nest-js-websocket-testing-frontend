import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import { useAuthCheck } from "../hooks/HOKs/useAuthCheck";
import ChatPlaceholder from "../pages/Chat/ChatPlaceholder/ChatPlaceholder";

export default function () {
  const { isSuccessLogIn, isErrorLogIn, user, access_token } = useAuthCheck();

  if (isErrorLogIn || (!user && !access_token)) {
    return <Auth />;
  } else if (isSuccessLogIn || user) {
    return <Navigate to="/profile" />;
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
