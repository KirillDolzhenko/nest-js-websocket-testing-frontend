import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { AppDispatch, RootState } from '@/redux/store';
import { IDBMessage, IJWTTokens } from '@/types/redux/auth';
import { newMessageChatDirect, newMessageChatGroup, setNewMessage } from '@/redux/slice/chatSlice';
import { useSocketContext } from '@/App';
import { EnumChatType } from '@/types/redux/chat';
import { ISendMessage } from '@/types/functions';
import axios, { AxiosResponse } from 'axios';
import { setTokens } from '@/redux/slice/authSlice';
import config from '@/config/config';
// import { setNewMessage } from '';

export default function () {
    const dispatch = useDispatch<AppDispatch>();
  
    let userId = useSelector((state: RootState) => state.authSlice.user?.id);
    let chatDataId = useSelector(
      (state: RootState) => state.chatSlice.chatData?.id
    );
    let chatType = useSelector((state: RootState) => state.chatSlice.chatType);
    let socket = useSocketContext();

    let chatsDirect = useSelector((state: RootState) => state.chatSlice.chatsDirect);
    let chatsGroup = useSelector((state: RootState) => state.chatSlice.chatsGroup);

    useEffect(() => {
        if (socket && userId) {
          socket.on("message", (data: IDBMessage) => {
            console.log(data, "MESSSSSAGEEE")

            if (chatType == data.recipientType) {
              if (chatType == EnumChatType.DIRECT) {
                if (
                  ((chatDataId == data.sender.id && userId == data.recipient.id) 
                  || (chatDataId == data.recipient.id 
                      && userId == data.sender.id
                    ))
                  ) {
                    dispatch(setNewMessage(data));
                  }
              } else {
                if (chatDataId == data.recipientGroupId) {    
                    dispatch(setNewMessage(data));
                  }
                }
            }
              // Block of unfocused messages

            if (data.recipientType == EnumChatType.DIRECT) {
              dispatch(newMessageChatDirect({
                user: data.senderId == userId ? data.recipient : data.sender,
                lastMessage: data.content
              }))
            } else if (data.recipientType == EnumChatType.GROUP && data.recipientGroup) {
              dispatch(newMessageChatGroup(data.recipientGroup));
            }
          }
          );

          socket.on("error", async (data: {
            type: "message" | "connect",
            message: string,
            data?: ISendMessage,
          }) => {
            if (data.type == "message") {
              if (data.message == "Invalid token") {
                let response: AxiosResponse<{
                  data: {
                    tokens: IJWTTokens
                  }
                }> = await axios.get(`${config.localhost.core}/user/refresh_token`, {
                  withCredentials: true
                });

                dispatch(setTokens(response.data.data.tokens));
                
                socket?.emit("message", {
                  ...data.data,
                  auth: {
                    token: response.data.data.tokens.access_token,
                  },
                });
              }
            }
          });
        }
    
        return () => {
          if (socket) {
            socket.off("message");
            socket.off("error")
          }
        };
      }, [socket, chatDataId, chatType, chatsGroup, chatsDirect, userId]);
}