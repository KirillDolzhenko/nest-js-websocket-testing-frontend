import { IDBMessage, IDBUser } from "./auth"
import { IDBContactDirect, IDBGroupBasic } from "./message"


export enum EnumChatType {
    DIRECT = "DIRECT",
    GROUP = "GROUP"
}

export enum EnumMessageType {
    FILE = "FILE",
    TEXT = "TEXT"
}

interface IChatSliceState_DirectSettings {
    chatType: undefined | EnumChatType.DIRECT,
    chatData: undefined | IDBUser,
}
interface IChatSliceState_GroupSettings {
    chatType: undefined | EnumChatType.GROUP,
    chatData: undefined | IDBGroupBasic,
}

export type IChatSliceState = (IChatSliceState_DirectSettings | IChatSliceState_GroupSettings) & {
    chatMessages: IDBMessage[],
    chatsDirect: IDBContactDirect[],
    chatsGroup: IDBGroupBasic[]
}
