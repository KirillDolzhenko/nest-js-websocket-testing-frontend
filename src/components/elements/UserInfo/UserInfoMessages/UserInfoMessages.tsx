import { IPropsUserInfoMessages } from "@/types/props/props";
import UserInfoSmall from "../UserInfoSmall/UserInfoSmall";
import classes from "./UserInfoMessages.module.scss";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { EnumChatType } from "@/types/redux/chat";
import { setDirectChat } from "@/redux/slice/chatSlice";

export default function ({ userMes }: IPropsUserInfoMessages) {
  const userId = useSelector((state: RootState) => state.authSlice.user?.id);
  const chatDataId = useSelector(
    (state: RootState) => state.chatSlice.chatData?.id
  );
  const chatType = useSelector((state: RootState) => state.chatSlice.chatType);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={classes.usersList}>
      {userMes.map((el) => (
        <button
          key={el.user.id}
          onClick={() => {
            if (
              !(chatDataId == el.user.id && chatType == EnumChatType.DIRECT)
            ) {
              dispatch(setDirectChat(el.user));
            }
          }}
        >
          <UserInfoSmall
            className={classNames(
              classes.usersList__el,
              el.user.id === chatDataId && chatType == EnumChatType.DIRECT
                ? classes.active
                : ""
            )}
            username={el.user.id == userId ? "@notes" : el.user.username}
            color={
              el.user.id !== chatDataId || chatType != EnumChatType.DIRECT
                ? el.user.picColor
                : undefined
            }
            url={el.user.picUrl}
            desc={el.lastMessage}
            letter={
              el.user.id == userId
                ? "@"
                : el.user.username.slice(0, 1).toUpperCase()
            }
          />
        </button>
      ))}
    </div>
  );
}
