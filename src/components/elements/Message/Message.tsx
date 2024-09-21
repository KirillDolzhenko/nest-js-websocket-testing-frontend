import {
  IPropsChildren,
  IPropsClassName,
  IPropsMessage,
  IPropsMessageBlock,
} from "@/types/props/props";
import classes from "./Message.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import classNames from "classnames";
import moment from "moment";
import { useSocketContext } from "@/App";
import { useCallback, useEffect, useRef, useState } from "react";
import { IDBMessage } from "@/types/redux/auth";
import { setMessages, setNewMessage } from "@/redux/slice/chatSlice";
import { EnumChatType } from "@/types/redux/chat";
import { useGetMessagesDirectMutation } from "@/redux/api/chat.api";

export default function ({ className, content, sender }: IPropsMessage) {
  return (
    <div
      className={classNames(
        classes.message,
        sender ? classes.sender : undefined
      )}
    >
      <span className={classes.message__content}>{content.content}</span>
      <span className={classes.message__time}>
        {moment(content.createdAt).format("LT")}
      </span>
    </div>
  );
}
