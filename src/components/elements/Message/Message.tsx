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

export function Message({ className, content, sender }: IPropsMessage) {
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

export function DateMessage({ children }: IPropsChildren) {
  return <span className={classes.date}>{children}</span>;
}

export function MessageBlock({ content }: IPropsMessageBlock) {
  const dispatch = useDispatch<AppDispatch>();

  const refBlock = useRef<HTMLDivElement>(null);

  let user = useSelector((state: RootState) => state.authSlice.user);

  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);
  let chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );

  let socket = useSocketContext();

  useEffect(() => {
    if (socket && user?.id && chatDataId) {
      socket.on("message", (data: IDBMessage) => {
        if (
          chatType == data.messageType &&
          ((chatDataId == data.sender.id && user?.id == data.recipient.id) ||
            (chatDataId == data.recipient.id && user?.id == data.sender.id))
        ) {
          dispatch(setNewMessage(data));
        }
      });
    }

    console.log("Chat Data ID", chatDataId);

    return () => {
      if (socket) {
        socket.off("message");
      }
    };
  }, [socket, chatDataId, user?.id]);

  useEffect(() => {
    if (chatDataId && user?.id) {
      setLoadedServerMes(false);
      getMessageDirect({
        user_sender: user.id,
        user_recipient: chatDataId,
      });
    }
  }, [chatDataId, user?.id]);

  let renderMessagesContent = useCallback(() => {
    let lastDate = "";
    refBlock;

    return content.map((el) => {
      let currentDate = moment(el.createdAt).format("YYYY-MM-DD");
      let showDate = currentDate !== lastDate;

      lastDate = currentDate !== lastDate ? currentDate : lastDate;

      return (
        <>
          {showDate && (
            <DateMessage>{moment(el.createdAt).format("LL")}</DateMessage>
          )}
          <Message
            content={{
              ...el,
            }}
            sender={el.sender.id == user?.id}
          ></Message>
        </>
      );
    });
  }, [content]);

  let [getMessageDirect, { isSuccess, isError, isLoading, data }] =
    useGetMessagesDirectMutation();

  useEffect(() => {
    if (isSuccess && data) {
      console.log("Init");
      console.log("SOmething", data);
      dispatch(setMessages(data.content));
    }
  }, [data]);

  let [loadedServerMes, setLoadedServerMes] = useState<boolean>(false);

  useEffect(() => {
    if (!loadedServerMes && content.length > 0) {
      refBlock.current?.scrollIntoView({ behavior: "instant" });

      setLoadedServerMes(true);
    } else {
      refBlock.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [renderMessagesContent]);

  return (
    <div className={classes.messageBlock}>
      {renderMessagesContent()}
      <div ref={refBlock}></div>
    </div>
  );
}
