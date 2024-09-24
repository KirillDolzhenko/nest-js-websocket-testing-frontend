import { TUseCopyToBuffer } from "@/types/hooks/hooks";
import { useCallback } from "react";

let useCopyToBuffer: TUseCopyToBuffer = (content) => {
    let copyBufferUrl = useCallback(() => {
        navigator.clipboard.writeText(content);
      }, []);

    return copyBufferUrl;
}

export default useCopyToBuffer;