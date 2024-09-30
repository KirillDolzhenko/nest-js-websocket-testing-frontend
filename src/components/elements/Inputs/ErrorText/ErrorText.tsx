import { IPropsChildren } from "@/types/props/props";
import classes from "./ErrorText.module.scss";

export default function ({ children }: IPropsChildren) {
  return <div className={classes.error}>{children}</div>;
}
