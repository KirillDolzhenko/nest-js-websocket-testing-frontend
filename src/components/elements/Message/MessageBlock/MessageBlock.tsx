import { IPropsMessageBlock } from "@/types/props/props";
import classes from "./MessageBlock.module.scss";
import { useEffect, useRef } from "react";
import useSocketOnMessage from "@/components/hooks/HOKs/socket/useSocketOnMessage";
import useLoadServerMes from "@/components/hooks/HOKs/messages/useLoadServerMes";
import useRenderMessagesContent from "@/components/hooks/HOKs/messages/useRenderMessagesContent";

export default function MessageBlock({ content }: IPropsMessageBlock) {
  const refBlock = useRef<HTMLDivElement>(null);
  let [loadedServerMes, setLoadedServerMes] = useLoadServerMes();
  let renderMessagesContent = useRenderMessagesContent(content);

  useSocketOnMessage();

  useEffect(() => {
    if (!loadedServerMes && content.length > 0) {
      refBlock.current?.scrollIntoView({ behavior: "instant" });

      setLoadedServerMes(true);
    } else {
      refBlock.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [renderMessagesContent]);

  return (
    <div className={classes.messageBlock}>
      {renderMessagesContent()}
      <div ref={refBlock}></div>
    </div>
  );
}
