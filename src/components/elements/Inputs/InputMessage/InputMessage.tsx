import classNames from "classnames";
import classes from "./InputMessage.module.scss";
import { IPropsClassName } from "@/types/props/props";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { Tooltip } from "react-tooltip";
import { BsEmojiSmile } from "react-icons/bs";
import { ImAttachment } from "react-icons/im";
import { IoSend } from "react-icons/io5";
import {
  SyntheticEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import useSocketSendMessage from "@/components/hooks/HOKs/socket/useSocketSendMessage";
import useAddEmoji from "@/components/hooks/HOKs/messages/useAddEmoji";
import useToggleEmojiPicker from "@/components/hooks/HOKs/input/useToggleEmojiPicker";
import { EnumMessageType } from "@/types/redux/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useUploadMessageFileMutation } from "@/redux/api/files.api";

export default function ({ className }: IPropsClassName) {
  const [activeEmoji, setActiveEmoji] = useState<boolean>(false);

  const [message, setMessage] = useState<string>("");
  const [cursorPos, setCursorPos] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);
  const refTextarea = useRef<HTMLTextAreaElement>(null);
  const refEmojiToggle = useRef<HTMLButtonElement>(null);
  const refInputFile = useRef<HTMLInputElement>(null);

  // let chatData = useSelector((state:RootState) => state.chatSlice.chatData);
  const chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );
  const chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  const addEmoji = useAddEmoji({
    refTextarea,
    setMessage,
    setActiveEmoji,
    setCursorPos,
  });

  useToggleEmojiPicker(ref, refTextarea, refEmojiToggle, setActiveEmoji);

  const sendMessage = useSocketSendMessage();

  useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.selectionStart = cursorPos;

      refTextarea.current.selectionEnd = cursorPos;
    }
  }, [cursorPos]);

  const [uploadMessageFile, { isSuccess, data }] = useUploadMessageFileMutation();

  const uploadAttachment = useCallback(
    (e: SyntheticEvent<HTMLInputElement, Event>) => {
      if (
        e.target &&
        "files" in e.target &&
        e.target instanceof HTMLInputElement &&
        e.target.files?.length
      ) {
        if (e.target.files[0].size < 50000000) {
          uploadMessageFile({
            file: e.target.files[0],
          });
        }
      }
    },
    []
  );

  useEffect(() => {
    if (isSuccess && data && chatDataId && chatType) {
      sendMessage({
        content: data.file.path,
        recipient: chatDataId,
        recipientType: chatType,
        messageType: EnumMessageType.FILE,
      });
    }
  }, [data]);

  return (
    <div className={classNames(classes.input, className)}>
      <div className={classes.input__content}>
        <textarea
          ref={refTextarea}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className={classes.input__textarea}
        ></textarea>
        <div className={classes.input__buttons}>
          {activeEmoji ? (
            <div ref={ref} className={classes.emojiPicker}>
              <EmojiPicker
                style={{
                  width: "250px",
                  height: "300px",
                }}
                lazyLoadEmojis={true}
                onEmojiClick={addEmoji}
                theme={Theme.DARK}
                open={activeEmoji}
              />
            </div>
          ) : (
            <></>
          )}
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.input__emoji}`}
            place="top"
          >
            Add emoji
          </Tooltip>
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.input__send}`}
            place="top"
          >
            Send message
          </Tooltip>
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.button__attachment}`}
            place="top"
          >
            Send file
          </Tooltip>
          <button
            ref={refEmojiToggle}
            className={classNames(classes.input__button, classes.input__emoji)}
            onClick={() => {
              setActiveEmoji(!activeEmoji);
            }}
          >
            <BsEmojiSmile className={classes.svg__emoji} />
          </button>
          <button
            onClick={() => {
              if (refInputFile.current) {
                refInputFile.current.click();
              }
            }}
            className={classNames(
              classes.input__button,
              classes.button__attachment
            )}
          >
            <input
              onChange={(e) => {
                uploadAttachment(e);
              }}
              className={classes.inputFile}
              ref={refInputFile}
              type="file"
            />
            <ImAttachment className={classes.svg__attachment} />
          </button>
        </div>
      </div>
      <button
        onClick={() => {
          if (refTextarea.current?.value) {
            if (chatDataId && refTextarea.current?.value && chatType) {
              sendMessage({
                content: message,
                recipient: chatDataId,
                recipientType: chatType,
                messageType: EnumMessageType.TEXT,
              });

              setMessage("");
            }
          }
        }}
        className={classes.input__send}
      >
        <IoSend />
      </button>
    </div>
  );
}
