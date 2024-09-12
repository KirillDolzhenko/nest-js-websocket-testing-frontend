import { IPropsProfilePicture } from "@/types/props/props";
import classes from "./ProfilePictureChatSidebar.module.scss";
import ProfilePicture from "../ProfilePicture";

export default function ({ url, username, color }: IPropsProfilePicture) {
  return (
    <span className={classes.container}>
      <ProfilePicture url={url} color={color} username={username} />
    </span>
  );
}
