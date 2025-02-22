import { FaFire } from "react-icons/fa";
import classes from "./Logo.module.scss";
import { IPropsClassName } from "@/types/props/props";
import classNames from "classnames";

export default ({ className }: IPropsClassName) => {
  return (
    <span className={classNames(classes.logo, className)}>
      <FaFire />
      FlameChat
    </span>
  );
};
