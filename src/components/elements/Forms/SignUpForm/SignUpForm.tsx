import { useCallback, useEffect, useState } from "react";
import InputText from "../../Inputs/InputText";
import classes from "./SignUpForm.module.scss";
import { setTokens, setUser } from "@/redux/slice/authSlice";
import { SignUpSchema, SignUpSchemaType } from "@/validators/signup.validator";
import ButtonForm from "../../Buttons/ButtonForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "@/redux/api/auth.api";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "@/redux/store";
import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";

export default function () {
  let dispatch = useDispatch<AppDispatch>();

  let [
    signup,
    {
      isError: isErrorSignUp,
      isSuccess: isSuccessSignUp,
      isLoading: isLoadingSignUp,
      data: dataSignUp,
      error,
    },
  ] = useSignUpMutation();

  const {
    register: registerSignUp,
    handleSubmit: handleSubmitSignUp,
    formState: { errors: errorsSignUp },
  } = useForm<SignUpSchemaType>({ resolver: zodResolver(SignUpSchema) });

  useEffect(() => {
    if (dataSignUp) {
      dispatch(setUser(dataSignUp.user));
      dispatch(setTokens(dataSignUp.tokens));
    }
  }, [dataSignUp]);

  let onSubmitSignUp = useCallback((data: SignUpSchemaType) => {
    console.log("FFFF");
    signup(data);
  }, []);

  useEffect(() => {
    // if (isErrorSignUp) {
    console.log("error", isErrorSignUp);
    // }
  }, [isErrorSignUp]);

  return (
    <form
      onSubmit={handleSubmitSignUp(onSubmitSignUp)}
      className={classes.form}
    >
      <InputText
        type="text"
        register={registerSignUp("username")}
        placeholder="Ник"
        error={errorsSignUp.username?.message}
      />
      <InputText
        type="email"
        register={registerSignUp("email")}
        placeholder="Почта"
        error={errorsSignUp.email?.message}
      />
      <InputText
        type="password"
        register={registerSignUp("password")}
        placeholder="Пароль"
        error={errorsSignUp.password?.message}
      />
      <ButtonForm type="submit">Sign In</ButtonForm>
      { isLoadingSignUp ? "Loading" : isSuccessSignUp ? "Account created" : isErrorSignUp ? RTKGetErrorMessage(error) : <></>}
    </form>
  );
}
