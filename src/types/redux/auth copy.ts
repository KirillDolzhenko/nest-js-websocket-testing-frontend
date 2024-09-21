import { FetchArgs } from "@reduxjs/toolkit/query"
import { EnumChatType } from "./chat"
import { IDBMessage } from "./auth"


export enum EnumDBUserColor {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW"
}

export interface IRTKGetMessageDirect {
    user_sender: string,
    user_recipient: string,
}


export interface IDBGetMessageDirect {
        content: IDBMessage[],
        user_sender: string,
        user_recipient: string,
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