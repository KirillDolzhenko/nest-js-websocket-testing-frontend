import { useSocketContext } from "@/App";
import { RootState } from "@/redux/store";
import { ISendMessage } from "@/types/functions";
import { EnumChatType } from "@/types/redux/chat";
import { useCallback } from "react";
import { useSelector } from "react-redux";

export default function () {
    // let chatData = useSelector((state:RootState) => state.chatSlice.chatData);
    // let chatDataId = useSelector((state:RootState) => state.chatSlice.chatData?.id);
    // let chatType = useSelector((state:RootState) => state.chatSlice.chatType);
    
    let socket = useSocketContext();

    let sendMessage = useCallback(
      (message: ISendMessage) => {
        // if (chatType == EnumChatType.DIRECT && chatData) {
          socket?.emit("message", {
            ...message
          });
        // }
      },
      [socket]
    );

    return sendMessage
}