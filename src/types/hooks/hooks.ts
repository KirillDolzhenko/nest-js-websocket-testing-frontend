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

//Socket

export type TUseSocketSendMessage = () => (content: string) => void;