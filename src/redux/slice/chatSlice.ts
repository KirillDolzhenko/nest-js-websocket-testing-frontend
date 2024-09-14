import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IDBUser } from "../../types/redux/auth";
import { EnumChatType, IChatSliceState } from "@/types/redux/chat";

let initialState: IChatSliceState = {
    chatData: undefined,
    chatType: undefined
}

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {
        setDirectChat(state, action: PayloadAction<IDBUser>) {
            state.chatType = EnumChatType.DIRECT;
            state.chatData = action.payload;
        },
        closeChat(state) {
            state.chatData = undefined;
            state.chatType = undefined;
        }
    }
})

export const { 
    setDirectChat,
    closeChat
} = chatSlice.actions;

export default chatSlice.reducer