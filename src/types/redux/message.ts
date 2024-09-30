import { IDBMessage, IDBUser } from "./auth"

export enum EnumDBUserColor {
    RED = "RED",
    BLUE = "BLUE",
    GREEN = "GREEN",
    YELLOW = "YELLOW"
}

//

export interface IRTKGetMessageDirect {
    user_sender: string,
    user_recipient: string,
}

export interface IRTKCreateGroup {
    title: string,
    members: string[],
}

//

export interface IDBGetMessageDirect {
        content: IDBMessage[],
        user_sender: string,
        user_recipient: string,
}

export interface IDBContactDirect {
    user: IDBUser,
    lastMessage: string
}

export interface IDBGroupBasic {
    id: string,
    title: string,
    adminId: string,
    membersId: string[]
}

export interface IDBGroup extends IDBGroupBasic {
    admin: IDBUser,
    members: IDBUser[]
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