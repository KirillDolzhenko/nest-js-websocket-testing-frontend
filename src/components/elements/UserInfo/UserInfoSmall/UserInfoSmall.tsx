import { IPropsUserInfo } from "@/types/props/props";
import classes from "./UserInfoSmall.module.scss";
import ProfilePictureSmall from "../../Picture/ProfilePictureSmall/ProfilePictureSmall";
import classNames from "classnames";

export default function ({
  className,
  url,
  color,
  username,
  letter,
  desc,
}: IPropsUserInfo) {
  return (
    <div className={classNames(className, classes.userInfo)}>
      <ProfilePictureSmall
        url={url}
        color={color}
        username={username}
        letter={letter}
      />
      <div className={classes.userInfo__content}>
        <span className={classes.userInfo__username}>{username}</span>
        <span className={classes.userInfo__desc}>{desc}</span>
      </div>
    </div>
  );
}
