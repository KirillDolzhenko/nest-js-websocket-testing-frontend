import { TUseDownloadFile } from "@/types/hooks/hooks";
import { useCallback } from "react";

const useDownloadFile: TUseDownloadFile = (content) => {
    
  const downloadFile = useCallback(async () => {
      try {
        const response = await fetch(content);
        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = blobUrl;
        const filename = content.split("/").pop();
        if (filename) {
          a.download = filename;
        }
        
        a.click();
      } catch (err) {
        console.log(error)
      }
    
  }, [content]);

  return downloadFile
}

export default useDownloadFile;