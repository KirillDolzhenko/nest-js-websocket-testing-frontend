import { FetchArgs } from "@reduxjs/toolkit/query"
import { IDBUser } from "./auth"


export enum EnumChatType {
    DIRECT = "DIRECT",
    GROUP = "GROUP"
}


export interface IChatSliceState {
    chatType: undefined | EnumChatType,
    chatData: undefined | IDBUser
}
