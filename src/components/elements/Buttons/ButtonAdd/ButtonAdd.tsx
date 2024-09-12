import classes from "./ButtonAdd.module.scss";
import { IPropsButtonAdd, IPropsClassName } from "@/types/props/props";
import { FiPlus } from "react-icons/fi";

export default function ({ onClick }: IPropsButtonAdd) {
  return (
    <button onClick={onClick} className={classes.button}>
      <FiPlus />
    </button>
  );
}
