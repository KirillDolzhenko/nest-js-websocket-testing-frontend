import classNames from "classnames";
import classes from "./ProfilePicture.module.scss";
import { IPropsClassName, IPropsProfilePicture } from "@/types/props/props";

export default function ({ url, color, username }: IPropsProfilePicture) {
  return (
    <span
      className={classNames(
        // classes.settings__image,
        classes.image,
        classes[`color_${color && color.toLowerCase()}`]
      )}
    >
      {url ? (
        <img src={url} alt="image" />
      ) : (
        <span className={classes.letter}>
          {username.substring(0, 1).toUpperCase()}
        </span>
      )}
    </span>
  );
}
