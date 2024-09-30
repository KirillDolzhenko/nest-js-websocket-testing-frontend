import { IPropsInputText } from "@/types/props/props";
import classes from "./InputText.module.scss";
import classNames from "classnames";
import ErrorText from "./ErrorText/ErrorText";

export default function ({
  value,
  placeholder,
  register,
  className,
  type,
  error,
  onChange,
}: IPropsInputText) {
  return (
    <>
      <input
        onChange={onChange}
        type={type}
        value={value}
        placeholder={placeholder}
        {...register}
        className={classNames(className, classes.input)}
      ></input>
      {error ? <ErrorText>{error}</ErrorText> : <></>}
    </>
  );
}
