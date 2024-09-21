import { EnumDBUserColor } from '@/types/redux/auth';
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IDBMessage, IDBUser } from "../../types/redux/auth";
import { EnumChatType, IChatSliceState } from "@/types/redux/chat";

let initialState: IChatSliceState = {
    chatData: undefined,
    chatType: undefined,
    chatMessages: []
}


const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        deleteChatSettings(state) {
            state.chatType = undefined;
            state.chatData = undefined;
            state.chatMessages = [];
        },
        setDirectChat(state, action: PayloadAction<IDBUser>) {
            state.chatType = EnumChatType.DIRECT;
            state.chatData = action.payload;
            state.chatMessages = [];
        },
        closeChat(state) {
            state.chatData = undefined;
            state.chatType = undefined;
        },
        setNewMessage(state, action: PayloadAction<IDBMessage>){
            state.chatMessages = [...state.chatMessages, action.payload];
        },
        setMessages(state, action: PayloadAction<IDBMessage[]>){
            state.chatMessages = [...action.payload];
        }
    }
})

export const { 
    setDirectChat,
    closeChat,
    setNewMessage,
    deleteChatSettings,
    setMessages
} = chatSlice.actions;

export default chatSlice.reducer