import Lottie from "lottie-react";
import classes from "./ChatPlaceholder.module.scss";
import { lottieLoading } from "@/config/lotties";

export default function () {
  return (
    <div className={classes.chatPlaceholder}>
      <div className={classes.chatPlaceholder__content}>
        <Lottie
          className={classes.chatPlaceholder__loading}
          animationData={lottieLoading}
          loop={true}
          style={{
            width: "200px",
            height: "200px",
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
