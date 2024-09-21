import classes from "./DateMessage.module.scss";
import { IPropsChildren } from "@/types/props/props";

export default function ({ children }: IPropsChildren) {
  return <span className={classes.date}>{children}</span>;
}
