import { IPropsButtonAdd, IPropsOnClick } from "@/types/props/props";
import classes from "./ButtonClose.module.scss";
import { IoClose } from "react-icons/io5";
import classNames from "classnames";

export default function ({ className, onClick }: IPropsOnClick) {
  return (
    <button className={classNames(classes.button, className)} onClick={onClick}>
      <IoClose />
    </button>
  );
}
