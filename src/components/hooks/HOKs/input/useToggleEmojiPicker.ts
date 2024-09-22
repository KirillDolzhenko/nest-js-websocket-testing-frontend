import { TUseToggleEmojiPicker } from "@/types/hooks/hooks";
import { useEffect } from "react";

let useToggleEmojiPicker: TUseToggleEmojiPicker = (
    ref,
    refTextarea, 
    refEmojiToggle, 
    setActiveEmoji
) => {
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
};

export default useToggleEmojiPicker;