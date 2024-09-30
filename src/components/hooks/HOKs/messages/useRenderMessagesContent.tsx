import { TUseRenderMessagesContent } from "@/types/hooks/hooks";
import moment from "moment";
import { useCallback } from "react";
import Message from "@components/elements/Message/Message";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import DateMessage from "@/components/elements/DateMessage/DateMessage";
import { EnumChatType, EnumMessageType } from "@/types/redux/chat";

let useRenderMessagesContent: TUseRenderMessagesContent = (content) => {
  let userId = useSelector((state: RootState) => state.authSlice.user?.id);
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  let renderMessagesContent = useCallback<() => JSX.Element[]>(() => {
    let lastDate = "";
    let today = moment().format("YYYY-MM-DD");
    let yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    // console.log("Render");

    return content.map((el) => {
      let currentDate = moment(el.createdAt).format("YYYY-MM-DD");
      let showDate = currentDate !== lastDate;

      lastDate = currentDate !== lastDate ? currentDate : lastDate;

      return (
        <>
          {showDate && (
            <DateMessage key={currentDate}>
              {currentDate == today
                ? "Today"
                : currentDate == yesterday
                ? "Yesterday"
                : moment(el.createdAt).format("LL")}
            </DateMessage>
          )}
          {<Message chatType={chatType as EnumChatType} key={el.id} content={el} sender={el.sender.id == userId} />}
        </>
      );
    });
  }, [content]);

  return renderMessagesContent;
};

export default useRenderMessagesContent;
