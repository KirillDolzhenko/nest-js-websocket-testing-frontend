import { IPropsMessage } from "@/types/props/props";
import classes from "./Message.module.scss";
import classNames from "classnames";
import moment from "moment";
import { useState } from "react";
import { EnumChatType, EnumMessageType } from "@/types/redux/chat";
import { FaFile } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import byteSize from "byte-size";
import ModalImage from "../Modal/ModalImage/ModalImage";
import useDownloadFile from "@/components/hooks/useDownloadFile";
import useCopyToBuffer from "@/components/hooks/useCopyToBuffer";
import ProfilePicture from "../Picture/ProfilePicture";

export default function ({
  className,
  content,
  sender,
  chatType,
}: IPropsMessage) {
  const [activeModal, setActiveModal] = useState<boolean>();

  const downloadFile = useDownloadFile(content.content);

  const copyToBufferMessage = useCopyToBuffer(content.content.trim());

  return (
    <>
      <div
        className={classNames(
          classes.message__container,
          sender ? classes.sender : ""
        )}
      >
        <div className={classes.message__pic}>
          {!sender && chatType == EnumChatType.GROUP ? (
            <ProfilePicture
              className={classes.profilePicture}
              url={content.sender.picUrl}
              color={content.sender.picColor}
              username={content.sender.username}
            />
          ) : (
            <></>
          )}
        </div>
        <div className={classes.message__info}>
          {!sender && chatType == EnumChatType.GROUP ? (
            <p className={classes.message__username}>
              {content.sender.username}
            </p>
          ) : (
            <></>
          )}
          <div>
            {content.messageType == EnumMessageType.TEXT ? (
              <div
                className={classNames(
                  classes.message,
                  classes.message__text,
                  sender ? classes.sender : undefined,
                  className
                )}
                onClick={copyToBufferMessage}
              >
                <span className={classes.message__content}>
                  {content.content.trim()}
                </span>
                <span className={classes.message__time}>
                  {moment(content.createdAt).format("LT")}
                </span>
              </div>
            ) : content.content.match(/\.(webp|jpeg|png|jpg|avif)/) ? (
              <div
                className={classNames(
                  classes.message,
                  classes.image,
                  sender ? classes.sender : undefined,
                  className
                )}
              >
                {activeModal ? (
                  <ModalImage
                    active={activeModal}
                    url={content.content}
                    setActive={setActiveModal}
                  />
                ) : (
                  <></>
                )}
                <span className={classes.message__content}>
                  <Tooltip
                    className="tooltip"
                    anchorSelect={`.${classes.message__image}`}
                    place="top"
                  >
                    Open image
                  </Tooltip>
                  <span className={classes.message__image}>
                    <img
                      onClick={() => {
                        setTimeout(() => setActiveModal(!activeModal), 0);
                      }}
                      src={content.content}
                    />
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
                  sender ? classes.sender : undefined,
                  className
                )}
              >
                <span className={classes.message__content}>
                  <Tooltip
                    className="tooltip"
                    anchorSelect={`.${classes.message__file}`}
                    place="top"
                  >
                    Download file
                  </Tooltip>
                  <a className={classes.message__file} onClick={downloadFile}>
                    <div className={classes.icon__file}>
                      <FaFile />
                    </div>
                    <div className={classes.file__description}>
                      <p>{content.content.split("/").pop()}</p>
                      <span>{byteSize(content.fileSize).toString()}</span>
                    </div>
                  </a>
                </span>
                <span className={classes.message__time}>
                  {moment(content.createdAt).format("LT")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export function MessageImage({ content, sender }: IPropsMessage) {
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
