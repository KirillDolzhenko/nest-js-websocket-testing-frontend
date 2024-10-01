import { TUseCopyToBuffer } from "@/types/hooks/hooks";
import { useCallback } from "react";

const useCopyToBuffer: TUseCopyToBuffer = (content) => {
    const copyBufferUrl = useCallback(() => {
        navigator.clipboard.writeText(content);
      }, []);

    return copyBufferUrl;
}

export default useCopyToBuffer;