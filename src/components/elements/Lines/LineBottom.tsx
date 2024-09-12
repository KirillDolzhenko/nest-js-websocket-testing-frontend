import { IPropsClassName } from "@/types/props/props";
import classes from "./LineBottom.module.scss";
import classNames from "classnames";

export default ({ className }: IPropsClassName) => {
  return <div className={classNames(classes.line, className)}></div>;
};
