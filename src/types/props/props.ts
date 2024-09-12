// Default

import { IDBUser } from "../redux/auth";

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
    
    placeholder?: string;
    value?: string;

    error?: string;
}

// Buttons

export interface IPropsButtonForm extends IPropsChildren {
    onClick?: () => void;
    type?: string
}

// ProfilePicture

export interface IPropsProfilePicture extends IPropsClassName {
    url?: string,
    color?: string,
    username: string
}

export interface IPropsUserInfo extends IPropsProfilePicture {}