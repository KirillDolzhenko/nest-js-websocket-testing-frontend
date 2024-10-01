import Lottie from "lottie-react";
import classes from "./ChatPlaceholder.module.scss";
import { lottieFire } from "@/config/lotties";
import { IPropsClassName } from "@/types/props/props";
import classNames from "classnames";

export default function ({ className }: IPropsClassName) {
  return (
    <div className={classNames(className, classes.chatPlaceholder)}>
      <div className={classes.chatPlaceholder__content}>
        <Lottie
          className={classes.chatPlaceholder__loading}
          animationData={lottieFire}
          loop={true}
          style={{
            width: "100px",
            height: "100px",
          }}
        />
        <div className={classes.chatPlaceholder__message}>
          <mark>Привет!</mark> Выбери контакт, чтобы написать{" "}
          <mark>сообщение!</mark>
        </div>
      </div>
    </div>
  );
}
