import { IPropsClassName, IPropsUserInfo } from "@/types/props/props";
import classes from "./UserInfoSmall.module.scss";
import ProfilePictureSmall from "../../Picture/ProfilePictureSmall/ProfilePictureSmall";
import classNames from "classnames";

export default function ({ className, url, color, username }: IPropsUserInfo) {
  return (
    <div className={classNames(className, classes.userInfo)}>
      <ProfilePictureSmall url={url} color={color} username={username} />
      <span className={classes.userInfo__username}>{username}</span>
    </div>
  );
}
