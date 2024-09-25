import { FetchArgs } from "@reduxjs/toolkit/query"
import { EnumChatType, EnumMessageType } from "./chat"


export enum EnumDBUserColor {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW"
}

export interface FetchArgsWithReauth extends FetchArgs {
    authLogic?: boolean
}


export interface IJWTTokens {
    access_token: string,
    refresh_token: string
}

export interface IJWTTokensRefresh {
    data: {
        tokens: IJWTTokens
    }
}

export interface IJWTTokensOptional {
    access_token?: string,
    refresh_token?: string
}

export interface IRTKQuerySignUp {
    username: string,
    email: string,
    password: string,
}

export interface IRTKQueryUpdateProfile {
    username: string,
    email: string,
    picUrl?: string,
    picColor?: EnumDBUserColor
}

export interface IRTKQueryLogIn {
    email: string,
    password: string,
}
export interface IRTKQueryUploadFile {
    file: File
}

export interface IRTKQuerySearchUsers {
    query: string,
}

export interface IRTKMutationGetAllUsers {
    arrId?: string[],
}

export interface IDBPicture {
    file: {
        path: string
    }
}

export interface IDBFile {
    file: {
        path: string,
        filename: string
    }
}

export interface IDBUser {
    id: string
    username: string,
    email: string,
    picColor: EnumDBUserColor;
    picUrl?: string,
}

enum IDBMessageType {
    DIRECT = "DIRECT",
    GROUP = "GROUP"
}

export interface IDBMessageText {
    id: string,

    sender: IDBUser,
    senderId: string,
    
    recipient: IDBUser,
    recipientId: string,
    recipientType: EnumChatType,

    messageType: EnumMessageType.TEXT,
    content: string,

    createdAt: string,
    updatedAt: string,
}

export interface IDBMessageFile extends Omit<IDBMessageText, "messageType"> {
    messageType: EnumMessageType.FILE,
    fileSize: number,
}

export type IDBMessage = IDBMessageFile | IDBMessageText;

export interface IDBLogOutResponse {
    data: {
        success: boolean
    }
}

export interface IDBUserWithTokens {
    user: IDBUser,
    tokens: IJWTTokens
}

export interface IAuthSliceState {
    user: null | IDBUser,
    tokens: null | IJWTTokensOptional
}

//

// type TypeRTKQueryPrepareHeaders = (
//     headers: Headers,
//     api: {
//       getState: () => RootState
//       extra: unknown
//       endpoint: string
//       type: 'query' | 'mutation'
//       forced: boolean | undefined
//     },
//   ) => Headers | void