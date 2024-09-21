import { Dispatch, SetStateAction } from "react";
import { IDBMessage } from "../redux/auth";

export type TUseLoadServerMes = [boolean, Dispatch<SetStateAction<boolean>>]
export type TUseRenderMessagesContent = (content: IDBMessage[]) => () => JSX.Element[];