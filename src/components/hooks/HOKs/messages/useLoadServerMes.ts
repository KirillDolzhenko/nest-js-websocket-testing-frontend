import { useGetMessagesDirectMutation } from "@/redux/api/chat.api";
import { useGetMessagesGroupMutation } from "@/redux/api/group.api";
import { setMessages } from "@/redux/slice/chatSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { TUseLoadServerMes } from "@/types/hooks/hooks";
import { EnumChatType } from "@/types/redux/chat";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ():TUseLoadServerMes {
    const dispatch = useDispatch<AppDispatch>();
  
    const userId = useSelector((state: RootState) => state.authSlice.user?.id);
    const chatDataId = useSelector(
      (state: RootState) => state.chatSlice.chatData?.id
    );
    const chatType = useSelector(
      (state: RootState) => state.chatSlice.chatType
    );
    
    const [
      getMessageGroup, 
      { 
        isSuccess: isSuccessGroup, 
        isError: isErrorGroup, 
        isLoading: isLoadingGroup, 
        data: dataGroup 
      }
    ] =
    useGetMessagesGroupMutation()

    const [getMessageDirect, { isSuccess, isError, isLoading, data }] =
      useGetMessagesDirectMutation();

    useEffect(() => {
      console.log(chatDataId, userId, chatType)
      if (chatDataId && userId) {
        setLoadedServerMes(false);
        if (chatType == EnumChatType.DIRECT) {
          getMessageDirect({
            user_sender: userId,
            user_recipient: chatDataId,
          });
        } else {
          console.log("g")
          getMessageGroup(chatDataId)
        } 
      }        
    }, [chatDataId, userId, chatType]);

    useEffect(() => {
      console.log("g2")
      if (chatType == EnumChatType.DIRECT) {
        if (isSuccess && data) {
          dispatch(setMessages(data.content));
        }
      } else if (chatType == EnumChatType.GROUP){
        if (isSuccessGroup && dataGroup) {
          dispatch(setMessages(dataGroup));
        }
      }
    }, [data, dataGroup, isSuccess, isSuccessGroup]);

    useEffect(() => {
      console.log("LOAD")
    }, [isLoadingGroup])
    
    const [loadedServerMes, setLoadedServerMes] = useState<boolean>(false);

    return [loadedServerMes, setLoadedServerMes]
};