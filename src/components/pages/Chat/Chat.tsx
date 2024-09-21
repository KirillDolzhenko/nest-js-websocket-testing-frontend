import classes from "./Chat.module.scss";
import Lottie from "lottie-react";
import loadingAnimationLottie from "../../../assets/lottie/loading.json";
import ChatSidebar from "./ChatSidebar/ChatSidebar";
import ChatContent from "./ChatContent/ChatContent";
import ChatPlaceholder from "./ChatPlaceholder/ChatPlaceholder";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useSocketContext } from "@/App";
import { useEffect } from "react";

export default function () {
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  return (
    <div className={classes.chat}>
      <div className={classes.chat__container}>
        <ChatSidebar className={classes.chat__sidebar} />

        {!chatType ? (
          <ChatPlaceholder className={classes.chat__placeholder} />
        ) : (
          <ChatContent className={classes.chat__content} />
        )}
      </div>
    </div>
  );
}
