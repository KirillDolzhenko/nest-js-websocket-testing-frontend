import { IPropsProfilePicture } from "@/types/props/props";
import classes from "./ProfilePictureSmall.module.scss";
import ProfilePicture from "../ProfilePicture";

export default function ({
  url,
  username,
  color,
  letter,
}: IPropsProfilePicture) {
  return (
    <span className={classes.container}>
      <ProfilePicture
        url={url}
        color={color}
        username={username}
        letter={letter}
      />
    </span>
  );
}
