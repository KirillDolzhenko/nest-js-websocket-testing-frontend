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
import { EnumChatType, EnumMessageType } from "@/types/redux/chat";
import { useGetMessagesDirectMutation } from "@/redux/api/chat.api";
import { FaFile } from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import { Tooltip } from "react-tooltip";

export default function ({ className, content, sender }: IPropsMessage) {
  return (
    <>
      {content.messageType == EnumMessageType.TEXT ? (
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
      ) : content.content.match(/\.(webp|jpeg|png|jpg|avif)/) ? (
        <div
          className={classNames(
            classes.message,
            classes.image,
            sender ? classes.sender : undefined
          )}
        >
          <span className={classes.message__content}>
            <span className={classes.message__image}>
              <img src={content.content} />
            </span>
          </span>
          <span className={classes.message__time}>
            {moment(content.createdAt).format("LT")}
          </span>
        </div>
      ) : (
        <div
          className={classNames(
            classes.message,
            classes.file,
            sender ? classes.sender : undefined
          )}
        >
          <span className={classes.message__content}>
            {/* <span > */}
            <Tooltip
              className="tooltip"
              anchorSelect={`.${classes.message__file}`}
              place="top"
            >
              Download file
            </Tooltip>
            <a
              className={classes.message__file}
              href="content.content"
              download
            >
              <div className={classes.icon__file}>
                <FaFile />
              </div>
              <p>{content.content.split("/").pop()}</p>
              {/* <IoMdDownload /> */}
            </a>
            {/* </span> */}
          </span>
          <span className={classes.message__time}>
            {moment(content.createdAt).format("LT")}
          </span>
        </div>
      )}
    </>
  );
}

export function MessageImage({ className, content, sender }: IPropsMessage) {
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
