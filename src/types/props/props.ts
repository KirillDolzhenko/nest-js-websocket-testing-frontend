
// Default

import { IDBMessage, IDBUser } from "../redux/auth";
import { EnumChatType } from "../redux/chat";
import { IDBContactDirect, IDBGroup, IDBGroupBasic } from "../redux/message";

export interface IPropsClassName {
    className?: string;
}

export interface IPropsChildren extends IPropsClassName {
    children: JSX.Element | string;
}

// Settings

export interface IPropsSettingsProfile extends IPropsClassName {
    user: IDBUser;
}

// Inputs

export interface IPropsInputText extends IPropsClassName {
    type: string;
    register?: any;

    onChange?: () => void;
    
    placeholder?: string;
    value?: string;

    error?: string;
}

// Buttons

export interface IPropsButtonForm extends IPropsChildren {
    onClick?: () => void;
    type?: string
}

export interface IPropsOnClick extends IPropsClassName {
    onClick?: () => void;
    type?: string
}

export interface IPropsButtonAdd extends IPropsClassName {
    onClick?: () => void;
    type?: string
}

// ProfilePicture

export interface IPropsProfilePicture extends IPropsClassName {
    username: string,
    url?: string,
    color?: string,
    letter?: string,
}

export interface IPropsUserInfo extends IPropsProfilePicture {
    desc?: string
}

export interface IPropsGroupInfo extends IPropsClassName {
    title: string,
    letter?: string,
    desc?: string
}

// Modal

export interface IPropsModalTemplate extends IPropsChildren {
    active: boolean,
    setActive: (active: boolean) => void,
    header: string,
    overflow?: boolean
}

export interface IPropsModalFindUser extends IPropsClassName {
    active: boolean,
    setActive: (active: boolean) => void
}

export interface IPropsModalImage extends IPropsClassName {
    active: boolean,
    setActive: (active: boolean) => void,
    url: string
}

// Messages 

export interface IPropsMessage extends IPropsClassName {
    content: IDBMessage;
    sender: boolean;
    chatType: EnumChatType
}

export interface IPropsMessageBlock extends IPropsClassName {
    content: IDBMessage[];
}

///

export interface IPropsUserInfoMessages extends IPropsClassName {
    userMes: IDBContactDirect[]
}


export interface IPropsGroupsInfoMessages extends IPropsClassName {
    groups: IDBGroupBasic[]
}

export interface IPropsInputSelect extends IPropsClassName {
    onChange?: (arr: string[]) => void,
    error?: string,
    active?: boolean
}