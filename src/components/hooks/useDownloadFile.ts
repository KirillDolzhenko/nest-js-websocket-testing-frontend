import { TUseDownloadFile } from "@/types/hooks/hooks";
import { EnumMessageType } from "@/types/redux/chat";
import { useCallback } from "react";

let useDownloadFile: TUseDownloadFile = (content) => {
    
  let downloadFile = useCallback(async () => {
      try {
        const response = await fetch(content);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        let filename = content.split("/").pop();
        if (filename) {
          a.download = filename;
        }
        
        a.click();
      } catch (err) {
        console.log(err);
      }
    
  }, [content]);

  return downloadFile
}

export default useDownloadFile;