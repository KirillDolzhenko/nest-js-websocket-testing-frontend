import { useEffect, useState } from "react";
import classes from "./Auth.module.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import ButtonForm from "@/components/elements/Buttons/ButtonForm";
import SignUpForm from "@/components/elements/Forms/SignUpForm/SignUpForm";
import LogInForm from "@/components/elements/Forms/LogInForm/LogInForm";

enum EnumToggleAuthState {
  LOG_IN = "login",
  SIGN_UP = "signup",
}

export default function () {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const navigate = useNavigate();

  const [activeState, setActiveState] = useState<EnumToggleAuthState>();

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  return (
    <div className={classes.container}>
      <section className={classes.auth__wrapper}>
        <div className={classes.auth__content}>
          <h2>Hi! ✌️</h2>
          <p>Log in or create your account for chatting</p>

          <div className={classes.auth__buttons}>
            <ButtonForm
              onClick={() => setActiveState(EnumToggleAuthState.LOG_IN)}
            >
              Log In
            </ButtonForm>
            <ButtonForm
              onClick={() => setActiveState(EnumToggleAuthState.SIGN_UP)}
            >
              Sign Up
            </ButtonForm>
          </div>

          {activeState == EnumToggleAuthState.LOG_IN ? <LogInForm /> : <></>}
          {activeState == EnumToggleAuthState.SIGN_UP ? <SignUpForm /> : <></>}
        </div>
      </section>
    </div>
  );
}
