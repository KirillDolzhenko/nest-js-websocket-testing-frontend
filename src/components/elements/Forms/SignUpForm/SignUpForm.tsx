import { useCallback, useEffect } from "react";
import InputText from "../../Inputs/InputText";
import classes from "./SignUpForm.module.scss";
import { setTokens, setUser } from "@/redux/slice/authSlice";
import { SignUpSchema, SignUpSchemaType } from "@/validators/signup.validator";
import ButtonForm from "../../Buttons/ButtonForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignUpMutation } from "@/redux/api/auth.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";
import ErrorText from "../../Inputs/ErrorText/ErrorText";
import LoadingText from "../../Inputs/LoadingText/LoadingText";
import SuccessText from "../../Inputs/SuccessText/SuccessText";

export default function () {
  const dispatch = useDispatch<AppDispatch>();

  const [
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

  const onSubmitSignUp = useCallback((data: SignUpSchemaType) => {
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
        placeholder="Username"
        error={errorsSignUp.username?.message}
      />
      <InputText
        type="email"
        register={registerSignUp("email")}
        placeholder="Email"
        error={errorsSignUp.email?.message}
      />
      <InputText
        type="password"
        register={registerSignUp("password")}
        placeholder="Password"
        error={errorsSignUp.password?.message}
      />
      <ButtonForm type="submit">Registrate</ButtonForm>

      {isLoadingSignUp ? (
        <LoadingText />
      ) : isSuccessSignUp ? (
        <SuccessText>Account created</SuccessText>
      ) : isErrorSignUp ? (
        <ErrorText>{RTKGetErrorMessage(error)}</ErrorText>
      ) : (
        <></>
      )}
    </form>
  );
}
