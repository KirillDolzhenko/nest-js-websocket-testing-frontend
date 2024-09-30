import { IPropsGroupInfo } from "@/types/props/props";
import UserInfoSmall from "../UserInfo/UserInfoSmall/UserInfoSmall";
import classes from "./GroupInfo.module.scss";

export default function ({ className, title, letter, desc }: IPropsGroupInfo) {
  return (
    <UserInfoSmall
      className={className}
      letter="#"
      username={title}
      desc={desc}
    />
  );
}
