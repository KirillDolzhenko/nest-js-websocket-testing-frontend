// import { useAddEmoji } from '@/components/hooks/HOKs/messages/useAddEmoji';
import { TUseAddEmoji } from "@/types/hooks/hooks";
import { EmojiClickData } from "emoji-picker-react";
import { useCallback } from "react";

const useAddEmoji: TUseAddEmoji = ({refTextarea, setMessage, setActiveEmoji, setCursorPos}) => {
    
  const addEmoji = useCallback((emoji: EmojiClickData) => {
    if (refTextarea.current) {
      const ref = refTextarea.current;

      const [selectionStart, selectionEnd] = [
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

export default useAddEmoji;