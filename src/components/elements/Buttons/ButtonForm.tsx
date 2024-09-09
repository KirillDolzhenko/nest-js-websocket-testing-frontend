import { IPropsButtonForm } from "@/types/props/props";
import classes from "./ButtonForm.module.scss";

export default function ({ children, onClick, type }: IPropsButtonForm) {
  return (
    <button onClick={onClick} className={classes.button} type={type}>
      {children}
    </button>
  );
}
