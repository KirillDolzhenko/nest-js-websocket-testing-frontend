import { IPropsClassName } from "@/types/props/props";
import classes from "./ChatSidebar.module.scss";
import classNames from "classnames";
import { FaFire } from "react-icons/fa";
import Logo from "@/components/elements/Logo/Logo";
import LineBottom from "@/components/elements/Lines/LineBottom";
import HeaderCategory from "@/components/elements/Headers/HeaderCategory";
import ProfilePicture from "@/components/elements/Picture/ProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfilePictureChatSidebar from "@/components/elements/Picture/ProfilePictureChatSidebar/ProfilePictureChatSidebar";
import UserInfoChatSidebar from "@/components/elements/UserInfo/UserInfoChatSidebar/UserInfoChatSidebar";

export default function ({ className }: IPropsClassName) {
  let user = useSelector((state: RootState) => state.authSlice.user);
  return (
    <div className={classNames(classes.chatSidebar, className)}>
      <div className={classes.chatSidebar__logo}>
        <Logo className={classes.logo} />
      </div>
      {/* <LineBottom /> */}
      {/* <button>
      </button> */}
      <div className={classes.chatSidebar__content}>
        <HeaderCategory>Messages</HeaderCategory>
        <HeaderCategory>Groups</HeaderCategory>
      </div>
      {user ? (
        <div className={classes.chatSidebar__user}>
          <LineBottom />
          <UserInfoChatSidebar
            url={user.picUrl}
            color={user.picColor}
            username={user.username}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
