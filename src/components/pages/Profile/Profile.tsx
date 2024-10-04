import classes from "./Profile.module.scss";

import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import SettingsProfile from "@/components/elements/Settings/SettingsProfile/SettingsProfile";
import { useNavigate } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import { IoChatbox } from "react-icons/io5";
import LineBottom from "@/components/elements/Lines/LineBottom";
import useLogOut from "@/components/hooks/HOKs/useLogOut";

export default function () {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const { func: logOut } = useLogOut();

  const navigate = useNavigate();


  return (
    <section className={classes.profile}>
      <div className={classes.profile__content}>
        <div className={classes.profile__buttons}>
          <button
            onClick={() => {
              logOut();
            }}
          >
            <MdExitToApp />
          </button>
          <button onClick={() => navigate("/chat")}>
            <IoChatbox />
          </button>
        </div>
        <LineBottom></LineBottom>
        <h1>
          Your profile
          {/* <span className={classes.profile__username}>{user?.username}</span> */}
        </h1>

        <LineBottom></LineBottom>
        {user && <SettingsProfile user={user} />}
      </div>
    </section>
  );
}
