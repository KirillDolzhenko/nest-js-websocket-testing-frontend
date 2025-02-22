import { LogInSchema, LogInSchemaType } from "@/validators/login.validator";
import InputText from "../../Inputs/InputText";
import classes from "./LogInForm.module.scss";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ButtonForm from "../../Buttons/ButtonForm";
import { useLogInMutation } from "@/redux/api/auth.api";
import { useCallback, useEffect } from "react";
import { setTokens, setUser } from "@/redux/slice/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";
import ErrorText from "../../Inputs/ErrorText/ErrorText";
import LoadingText from "../../Inputs/LoadingText/LoadingText";
import SuccessText from "../../Inputs/SuccessText/SuccessText";

export default function () {
  const dispatch = useDispatch<AppDispatch>();
  const [
    login,
    {
      isError: isErrorLogIn,
      isSuccess: isSuccessLogIn,
      isLoading: isLoadingLogIn,
      data: dataLogIn,
      error,
    },
  ] = useLogInMutation();

  const onSubmitLogIn = useCallback((data: LogInSchemaType) => {
    login(data);
  }, []);


  useEffect(() => {
    if (dataLogIn) {
      dispatch(setUser(dataLogIn.user));
      dispatch(setTokens(dataLogIn.tokens));
    }
  }, [dataLogIn]);

  const {
    register: registerLogIn,
    handleSubmit: handleSubmitLogIn,
    formState: { errors: errorsLogIn },
  } = useForm<LogInSchemaType>({ resolver: zodResolver(LogInSchema) });

  return (
    <form onSubmit={handleSubmitLogIn(onSubmitLogIn)} className={classes.form}>
      <InputText
        type="email"
        register={registerLogIn("email")}
        placeholder="Email"
        error={errorsLogIn.password?.message}
      />
      <InputText
        type="password"
        register={registerLogIn("password")}
        placeholder="Password"
        error={errorsLogIn.password?.message}
      />
      <ButtonForm className={classes.auth__button}>Enter</ButtonForm>

      {isLoadingLogIn ? (
        <LoadingText />
      ) : isSuccessLogIn ? (
        <SuccessText>You successfully log in</SuccessText>
      ) : isErrorLogIn ? (
        <ErrorText>{RTKGetErrorMessage(error)}</ErrorText>
      ) : (
        <></>
      )}
    </form>
  );
}
