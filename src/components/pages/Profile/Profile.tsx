import classes from "./Profile.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { removeUser } from "../../../redux/slice/authSlice";
import SettingsProfile from "@/components/elements/Settings/SettingsProfile/SettingsProfile";
import ButtonForm from "@/components/elements/Buttons/ButtonForm";
import { useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
import LineBottom from "@/components/elements/Lines/LineBottom";

export default function () {
  let user = useSelector((state: RootState) => state.authSlice.user);
  let dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  return (
    <section className={classes.profile}>
      <div className={classes.profile__content}>
        <div className={classes.profile__buttons}>
          <button onClick={() => dispatch(removeUser())}>
            <MdExitToApp />
          </button>
          <button onClick={() => navigate("/chat")}>
            <IoChatbox />
          </button>
        </div>
        <LineBottom></LineBottom>
        <h1>
          Ваш профиль
          {/* <span className={classes.profile__username}>{user?.username}</span> */}
        </h1>

        <LineBottom></LineBottom>
        {user && <SettingsProfile user={user} />}
      </div>
    </section>
  );
}
