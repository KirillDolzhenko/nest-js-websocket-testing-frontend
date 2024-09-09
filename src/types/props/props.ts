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