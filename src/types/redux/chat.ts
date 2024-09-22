import { FetchArgs } from "@reduxjs/toolkit/query"
import { IDBMessage, IDBUser } from "./auth"


export enum EnumChatType {
    DIRECT = "DIRECT",
    GROUP = "GROUP"
}

export enum EnumMessageType {
    FILE = "FILE",
    TEXT = "TEXT"
}

export interface IChatSliceState {
    chatType: undefined | EnumChatType,
    chatData: undefined | IDBUser,
    chatMessages: IDBMessage[],
}
