import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { AppDispatch, RootState } from '@/redux/store';
import { IDBMessage } from '@/types/redux/auth';
import { setNewMessage } from '@/redux/slice/chatSlice';
import { useSocketContext } from '@/App';
// import { setNewMessage } from '';

export default function () {
    const dispatch = useDispatch<AppDispatch>();
  
    let userId = useSelector((state: RootState) => state.authSlice.user?.id);
    let chatDataId = useSelector(
      (state: RootState) => state.chatSlice.chatData?.id
    );
    let chatType = useSelector((state: RootState) => state.chatSlice.chatType);
    let socket = useSocketContext();
  
    useEffect(() => {
        if (socket && userId && chatDataId) {
          socket.on("message", (data: IDBMessage) => {
            if (
              chatType == data.recipientType &&
              ((chatDataId == data.sender.id && userId == data.recipient.id) ||
                (chatDataId == data.recipient.id && userId == data.sender.id))
            ) {
              dispatch(setNewMessage(data));
            }
          });
        }
    
        return () => {
          if (socket) {
            socket.off("message");
          }
        };
      }, [socket, chatDataId, userId]);
}