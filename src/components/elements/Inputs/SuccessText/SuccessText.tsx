import { IPropsChildren } from "@/types/props/props";
import classes from "./SuccessText.module.scss"

export default function ({ children }: IPropsChildren) {
    return <div className={classes.success}>{children}</div>;
  }