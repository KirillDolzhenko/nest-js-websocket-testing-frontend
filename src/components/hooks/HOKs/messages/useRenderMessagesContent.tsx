import { TUseRenderMessagesContent } from "@/types/hooks/hooks";
import moment from "moment";
import { useCallback } from "react";
import Message from "@components/elements/Message/Message";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import DateMessage from "@/components/elements/DateMessage/DateMessage";
import { EnumChatType } from "@/types/redux/chat";

const useRenderMessagesContent: TUseRenderMessagesContent = (content) => {
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  const renderMessagesContent = useCallback<() => JSX.Element[]>(() => {
    let lastDate = "";
    const today = moment().format("YYYY-MM-DD");
    const yesterday = moment().subtract(1, "days").format("YYYY-MM-DD");

    // console.log("Render");

    return content.map((el) => {
      const currentDate = moment(el.createdAt).format("YYYY-MM-DD");
      const showDate = currentDate !== lastDate;

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
