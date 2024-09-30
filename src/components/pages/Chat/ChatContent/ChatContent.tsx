import { IPropsClassName } from "@/types/props/props";
import classes from "./ChatContent.module.scss";
import classNames from "classnames";
import LineBottom from "@/components/elements/Lines/LineBottom";
import { IoClose, IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { BsEmojiSmile } from "react-icons/bs";
import EmojiPicker, { Theme, EmojiClickData } from "emoji-picker-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Tooltip } from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import UserInfoSmall from "@/components/elements/UserInfo/UserInfoSmall/UserInfoSmall";
import { closeChat, setNewMessage } from "@/redux/slice/chatSlice";
import { useSocketContext } from "@/App";
import { IDBMessage, IDBUser } from "@/types/redux/auth";
import { EnumChatType } from "@/types/redux/chat";
import MessageBlock from "@/components/elements/Message/MessageBlock/MessageBlock";
import useAddEmoji from "@/components/hooks/HOKs/messages/useAddEmoji";
import InputMessage from "@/components/elements/Inputs/InputMessage/InputMessage";
import { IDBGroup } from "@/types/redux/message";
import GroupInfo from "@/components/elements/GroupInfo/GroupInfo";

export default function ({ className }: IPropsClassName) {
  let dispatch = useDispatch<AppDispatch>();

  let chatData = useSelector((state: RootState) => state.chatSlice.chatData);
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  let userId = useSelector((state: RootState) => state.authSlice.user?.id);

  let chatMessages = useSelector(
    (state: RootState) => state.chatSlice.chatMessages
  );

  // useEffect(() => {
  //   console.log("updated", chatMessages, chatType);
  // }, [chatMessages]);

  return (
    <div className={classNames(classes.chatContent, className)}>
      <div className={classes.chatContent__header}>
        {chatData ? (
          chatType === EnumChatType.DIRECT ? (
            <UserInfoSmall
              username={
                userId == (chatData as IDBUser).id
                  ? "@notes"
                  : (chatData as IDBUser).username
              }
              color={(chatData as IDBUser).picColor}
              url={(chatData as IDBUser).picUrl}
              letter={userId == (chatData as IDBUser).id ? "@" : undefined}
              desc={
                userId == (chatData as IDBUser).id
                  ? "Your notes"
                  : (chatData as IDBUser).email
              }
            />
          ) : (
            <GroupInfo
              title={(chatData as IDBGroup).title}
              desc={`${(chatData as IDBGroup).membersId.length + 1} members`}
            />
          )
        ) : (
          <></>
        )}
        <button onClick={() => dispatch(closeChat())}>
          <IoClose />
        </button>
      </div>
      <LineBottom />
      <div
        className={classNames(classes.messages, classes.chatContent__messages)}
      >
        <MessageBlock content={chatMessages} />
      </div>
      <LineBottom />
      <InputMessage className={classes.chatContent__input} />
    </div>
  );
}
