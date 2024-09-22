import { TUseAddEmoji } from "@/types/hooks/hooks";
import { EmojiClickData } from "emoji-picker-react";
import { useCallback } from "react";

let hook: TUseAddEmoji = ({refTextarea, setMessage, setActiveEmoji, setCursorPos}) => {
    
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

  return addEmoji
}

export default hook;