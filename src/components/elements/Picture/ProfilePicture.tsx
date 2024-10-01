import classNames from "classnames";
import classes from "./ProfilePicture.module.scss";
import { IPropsProfilePicture } from "@/types/props/props";

export default function ({
  className,
  url,
  color,
  username = "Аноним",
  letter,
}: IPropsProfilePicture) {
  return (
    <span
      className={classNames(
        className,
        // classes.settings__image,
        classes.image,
        classes[`color_${color && color.toLowerCase()}`]
      )}
    >
      {url ? (
        <img src={url} alt="image" />
      ) : (
        <span className={classes.letter}>
          {letter ? letter : username.substring(0, 1).toUpperCase()}
        </span>
      )}
    </span>
  );
}
