import classes from "./Chat.module.scss";
import Lottie from "lottie-react";
import loadingAnimationLottie from "../../../assets/lottie/loading.json";
import ChatContacts from "./ChatContacts/ChatContacts";
import ChatContent from "./ChatContent/ChatContent";
import ChatPlaceholder from "./ChatPlaceholder/ChatPlaceholder";

export default function () {
  return (
    <div>
      <div className={classes.chat__container}>
        <ChatContacts />
        <ChatPlaceholder />
        {/* <ChatContent /> */}
      </div>
    </div>
  );
}
