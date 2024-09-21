import { useGetMessagesDirectMutation } from "@/redux/api/chat.api";
import { setMessages } from "@/redux/slice/chatSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { TUseLoadServerMes } from "@/types/hooks/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ():TUseLoadServerMes {
    const dispatch = useDispatch<AppDispatch>();
  
    let userId = useSelector((state: RootState) => state.authSlice.user?.id);
    let chatDataId = useSelector(
      (state: RootState) => state.chatSlice.chatData?.id
    );

    useEffect(() => {
        if (chatDataId && userId) {
          setLoadedServerMes(false);
          getMessageDirect({
            user_sender: userId,
            user_recipient: chatDataId,
          });
        }
    }, [chatDataId, userId]);
    
    let [getMessageDirect, { isSuccess, isError, isLoading, data }] =
        useGetMessagesDirectMutation();
    
    useEffect(() => {
      if (isSuccess && data) {
        dispatch(setMessages(data.content));
      }
    }, [data]);
    
    let [loadedServerMes, setLoadedServerMes] = useState<boolean>(false);

    return [loadedServerMes, setLoadedServerMes]
};