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
import { closeChat } from "@/redux/slice/chatSlice";

export default function ({ className }: IPropsClassName) {
  let [activeEmoji, setActiveEmoji] = useState<boolean>(false);
  let [message, setMessage] = useState<string>("");

  let [cursorPos, setCursorPos] = useState<number>(0);

  let ref = useRef<HTMLDivElement>(null);
  let refTextarea = useRef<HTMLTextAreaElement>(null);
  let refEmojiToggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function closeClickOutside(e: MouseEvent) {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target) &&
        refEmojiToggle.current &&
        !refEmojiToggle.current.contains(e.target)
      ) {
        setActiveEmoji(false);
      }
    }

    document.addEventListener("mousedown", closeClickOutside);

    return () => document.removeEventListener("mousedown", closeClickOutside);
  }, [ref, refTextarea, refEmojiToggle]);

  let addEmoji = useCallback((emoji: EmojiClickData) => {
    if (refTextarea.current) {
      let ref = refTextarea.current;

      let [selectionStart, selectionEnd] = [
        ref.selectionStart,
        ref.selectionEnd,
      ];

      setMessage(
        (message) =>
          `${message.substring(0, selectionStart)}${
            emoji.emoji
          }${message.substring(selectionEnd)}`
      );

      setActiveEmoji(false);

      setCursorPos(ref.selectionStart + 1);
      ref.focus();
    }
  }, []);

  useEffect(() => {
    if (refTextarea.current) {
      refTextarea.current.selectionStart = cursorPos;

      refTextarea.current.selectionEnd = cursorPos;
    }
  }, [cursorPos]);

  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);
  let chatData = useSelector((state: RootState) => state.chatSlice.chatData);

  let dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classNames(classes.chatContent, className)}>
      <div className={classes.chatContent__header}>
        {chatData ? (
          <UserInfoSmall
            username={chatData.username}
            color={chatData.picColor}
            url={chatData.picUrl}
          />
        ) : (
          <></>
        )}
        <button onClick={() => dispatch(closeChat())}>
          <IoClose />
        </button>
      </div>
      <LineBottom />
      <div className={classes.chatContent__messages}></div>
      <LineBottom />
      <div className={classNames(classes.input, classes.chatContent__input)}>
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

            <Tooltip
              className="tooltip"
              anchorSelect={`.${classes.input__emoji}`}
              place="top"
            >
              Add emoji
            </Tooltip>
            <button
              ref={refEmojiToggle}
              className={classNames(
                classes.input__button,
                classes.input__emoji
              )}
              onClick={() => {
                setActiveEmoji(!activeEmoji);
              }}
            >
              <BsEmojiSmile className={classes.svg__emoji} />
            </button>
            <button className={classes.input__button}>
              <ImAttachment className={classes.svg__attachment} />
            </button>
          </div>
        </div>
        <button className={classes.input__send}>
          <IoSend />
        </button>
      </div>
    </div>
  );
}
