import { IPropsChildren } from "@/types/props/props";
import classes from "./WhiteText.module.scss";

export default function ({ children }: IPropsChildren) {
  return <div className={classes.loading}>{children}</div>;
}
