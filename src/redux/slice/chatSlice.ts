import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IDBMessage, IDBUser } from "../../types/redux/auth";
import { EnumChatType, IChatSliceState } from "@/types/redux/chat";
import { IDBContactDirect, IDBGroupBasic } from '@/types/redux/message';

const initialState: IChatSliceState = {
    chatData: undefined,
    chatType: undefined,

    chatMessages: [],

    chatsGroup: [],
    chatsDirect: []
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
        },

        setGroupChat(state, action: PayloadAction<IDBGroupBasic>) {
           console.log("setGroupChat")
           
            state.chatType = EnumChatType.GROUP;
            state.chatData = action.payload;
            state.chatMessages = [];
        },

        setChatsDirect(state, action: PayloadAction<IDBContactDirect[]>) {
            state.chatsDirect = [...action.payload];
        },
        setChatsGroup(state, action: PayloadAction<IDBGroupBasic[]>) {
             state.chatsGroup = [...action.payload];
        },

        newMessageChatDirect(state, action: PayloadAction<IDBContactDirect>) {
            if (state.chatsDirect.find(el => el.user.id == action.payload.user.id)) {
                state.chatsDirect = [
                    action.payload, 
                    ...state.chatsDirect.filter(
                        el => el.user.id !== action.payload.user.id
                    )
                ];
            } else {
              state.chatsDirect = [action.payload, ...state.chatsDirect];
            }
        },
        newMessageChatGroup(state, action: PayloadAction<IDBGroupBasic>) {
            if (state.chatsGroup.find(el => el.id == action.payload.id)) {
                state.chatsGroup = [
                    action.payload, 
                    ...state.chatsGroup.filter(
                        el => el.id !== action.payload.id
                    )
                ];
            } else {
                state.chatsGroup = [action.payload, ...state.chatsGroup];
            }
        },
    }
})

export const { 
    setDirectChat,
    closeChat,
    setNewMessage,
    deleteChatSettings,
    setMessages,
    setGroupChat,

    setChatsDirect,
    setChatsGroup,

    newMessageChatDirect,
    newMessageChatGroup
} = chatSlice.actions;

export default chatSlice.reducer