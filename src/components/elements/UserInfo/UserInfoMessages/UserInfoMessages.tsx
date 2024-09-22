import { IPropsUserInfoMessages } from "@/types/props/props";
import UserInfoSmall from "../UserInfoSmall/UserInfoSmall";
import classes from "./UserInfoMessages.module.scss";
import { EnumDBUserColor } from "@/types/redux/auth";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EnumChatType } from "@/types/redux/chat";
import { Link } from "react-router-dom";
import { setDirectChat } from "@/redux/slice/chatSlice";

export default function ({ users }: IPropsUserInfoMessages) {
  let userId = useSelector((state: RootState) => state.authSlice.user?.id);
  let chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );
  let chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  let dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classes.usersList}>
      {users.map((el) => (
        <button
          onClick={() => {
            dispatch(setDirectChat(el));
          }}
        >
          <UserInfoSmall
            className={classNames(
              classes.usersList__el,
              el.id === chatDataId && chatType == EnumChatType.DIRECT
                ? classes.active
                : ""
            )}
            username={el.username}
            color={
              el.id !== chatDataId || chatType != EnumChatType.DIRECT
                ? el.picColor
                : undefined
            }
            url={el.picUrl}
          />
        </button>
      ))}
    </div>
  );
}
