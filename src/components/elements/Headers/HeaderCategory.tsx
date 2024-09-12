import { IPropsChildren } from "@/types/props/props";
import classes from "./HeaderCategory.module.scss";
import classNames from "classnames";

export default ({ className, children }: IPropsChildren) => {
  return <h3 className={classNames(classes.header, className)}>{children}</h3>;
};
