import {
  IPropsGroupsInfoMessages,
} from "@/types/props/props";
import classes from "./GroupInfoMessages.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EnumChatType } from "@/types/redux/chat";
import GroupInfo from "../GroupInfo";
import { setGroupChat } from "@/redux/slice/chatSlice";

export default function ({ groups }: IPropsGroupsInfoMessages) {
  const dispatch = useDispatch<AppDispatch>();

  const chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );
  const chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  return (
    <div className={classes.groupsList}>
      {groups.map((el) => (
        <button
          key={el.id}
          onClick={() => {
            if (chatDataId !== el.id) {
              dispatch(setGroupChat(el));
            }
          }}
        >
          <GroupInfo
            className={classNames(
              classes.groupsList__el,
              el.id === chatDataId && chatType == EnumChatType.GROUP
                ? classes.active
                : ""
            )}
            title={el.title}
            desc={`${el.membersId.length + 1} members`}
          />
        </button>
      ))}
    </div>
  );
}
