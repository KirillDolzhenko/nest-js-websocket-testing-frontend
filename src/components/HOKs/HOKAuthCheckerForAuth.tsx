import { Navigate } from "react-router-dom";
import Auth from "../pages/Auth/Auth";
import { useAuthCheck } from "../hooks/HOKs/useAuthCheck";

export default function () {
  const { isSuccessLogIn, isErrorLogIn, user, access_token } = useAuthCheck();

  if (isErrorLogIn || (!user && !access_token)) {
    return <Auth />;
  } else if (isSuccessLogIn || user) {
    return <Navigate to="/profile" />;
  } else {
    return <>Загрузка...</>;
  }
}
