import { EnumChatType, EnumMessageType } from "./redux/chat";

export interface ISendMessage {
    content: string;
    messageType: EnumMessageType;
    
    recipient: string; 
    recipientType: EnumChatType;
}