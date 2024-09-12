import { IPropsClassName, IPropsUserInfo } from "@/types/props/props";
import classes from "./UserInfoTemplate.module.scss";
import ProfilePictureChatSidebar from "../../Picture/ProfilePictureChatSidebar/ProfilePictureChatSidebar";
import UserInfoTemplate from "../UserInfoTemplate/UserInfoTemplate";

export default function ({ className, url, color, username }: IPropsUserInfo) {
  return <UserInfoTemplate url={url} color={color} username={username} />;
}
