import Lottie from "lottie-react";
import classes from "./ChatPlaceholder.module.scss";
import { lottieFire } from "@/config/lotties";
import { IPropsChildren, IPropsClassName } from "@/types/props/props";
import classNames from "classnames";

export default function ({ className, children }: IPropsChildren) {
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
        <div className={classes.chatPlaceholder__message}>{children}</div>
      </div>
    </div>
  );
}
