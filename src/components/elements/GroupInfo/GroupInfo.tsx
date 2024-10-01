import { IPropsGroupInfo } from "@/types/props/props";
import UserInfoSmall from "../UserInfo/UserInfoSmall/UserInfoSmall";

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
