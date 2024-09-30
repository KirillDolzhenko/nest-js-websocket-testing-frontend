import {
  IPropsGroupsInfoMessages,
  IPropsUserInfoMessages,
} from "@/types/props/props";
import classes from "./GroupInfoMessages.module.scss";
import { EnumDBUserColor } from "@/types/redux/auth";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EnumChatType } from "@/types/redux/chat";
import GroupInfo from "../GroupInfo";
import { setGroupChat } from "@/redux/slice/chatSlice";

export default function ({ groups }: IPropsGroupsInfoMessages) {
  let dispatch = useDispatch<AppDispatch>();

  let chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

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
