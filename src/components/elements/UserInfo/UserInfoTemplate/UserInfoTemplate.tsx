import { IPropsClassName, IPropsUserInfo } from "@/types/props/props";
import classes from "./UserInfoTemplate.module.scss";
import ProfilePictureChatSidebar from "../../Picture/ProfilePictureChatSidebar/ProfilePictureChatSidebar";

export default function ({ className, url, color, username }: IPropsUserInfo) {
  return (
    <div className={classes.userInfo}>
      <ProfilePictureChatSidebar url={url} color={color} username={username} />
      <span className={classes.userInfo__username}>{username}</span>
    </div>
  );
}
