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
import classNames from "classnames";
import useSocketOnMessage from "@/components/hooks/HOKs/socket/useSocketOnMessage";

export default function () {
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  useSocketOnMessage();

  return (
    <div className={classes.chat}>
      <div className={classes.chat__container}>
        <ChatSidebar className={classes.chat__sidebar} />

        {chatType ? (
          <ChatContent className={classNames(classes.chat__content)} />
        ) : (
          // <></>
          <ChatPlaceholder className={classes.chat__placeholder} />
        )}
      </div>
    </div>
  );
}
