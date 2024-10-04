import { Dispatch, SetStateAction } from "react";
import { IDBMessage } from "../redux/auth";
import { EmojiClickData } from "emoji-picker-react";

export type TUseLoadServerMes = [boolean, Dispatch<SetStateAction<boolean>>]
export type TUseRenderMessagesContent = (content: IDBMessage[]) => () => JSX.Element[];

export type TUseAddEmoji = (props: {
    refTextarea: React.RefObject<HTMLTextAreaElement>,
    setMessage: (props: (smt: string) => string) => void,
    setActiveEmoji: (prop: boolean) => void,
    setCursorPos: (props: number) => void
}) => (emoji: EmojiClickData) => void;

export type TUseToggleEmojiPicker = (  
    ref: React.RefObject<HTMLDivElement>,
    refTextarea: React.RefObject<HTMLTextAreaElement>,
    refEmojiToggle: React.RefObject<HTMLButtonElement>,
    setActiveEmoji: (prop: boolean) => void,
) => void

// Socket

export type TUseSocketSendMessage = () => (content: string) => void;

// Modal

export type TUseClickOutside = (  
    refModal: React.RefObject<HTMLDivElement>,
    active: boolean,
    setActive: (prop: boolean) => void
) => void

// DownloadFile

export type TUseDownloadFile = (  
    content: string
) => () => void


export type TUseCopyToBuffer = (  
    content: string
) => () => void

// LogOut 

export type TUseLogOut = ( 
) => {
    func: () => void;
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
}