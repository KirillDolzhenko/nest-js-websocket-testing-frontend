import classes from "./Profile.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { removeUser } from "../../../redux/slice/authSlice";
import SettingsProfile from "@/components/elements/Settings/SettingsProfile/SettingsProfile";
import ButtonForm from "@/components/elements/Buttons/ButtonForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function () {
  let user = useSelector((state: RootState) => state.authSlice.user);
  // let [settingsState, setSettingsState] = useState<boolean>(false);
  let dispatch = useDispatch<AppDispatch>();

  let navigate = useNavigate();

  // useEffect(() => {
  //   console.log(user);

  //   if (!user) {
  //     dispatch(setChatsDirect([]));
  //     dispatch(setChatsGroup([]));

  //     console.log("ud");
  //     // useEffect(() => {
  //     //   if (!user) {
  //     //   }
  //     // }, [user]);
  //     navigate("/auth");
  //   }
  // }, [user]);

  return (
    <section className={classes.profile}>
      <div className={classes.profile__content}>
        <h1>
          Профиль пользователя <b>{user?.username}</b>
        </h1>
        {user && <SettingsProfile user={user} />}
        <div className={classes.profile__buttons}>
          <ButtonForm onClick={() => dispatch(removeUser())}>Выйти</ButtonForm>
          {/* <ButtonForm onClick={() => setSettingsState(!settingsState)}>
            {settingsState ? "Скрыть редактор" : "Редактировать"}
          </ButtonForm> */}
          <ButtonForm onClick={() => navigate("/chat")}>Чат</ButtonForm>
        </div>
      </div>
    </section>
  );
}
