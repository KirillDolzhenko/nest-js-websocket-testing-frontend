import { IPropsUserInfo } from "@/types/props/props";
import classes from "./UserInfoChatSidebar.module.scss";
import UserInfoTemplate from "../UserInfoTemplate/UserInfoTemplate";
import { FaPowerOff } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useLogOutMutation } from "@/redux/api/auth.api";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { removeUser } from "@/redux/slice/authSlice";
import {
  deleteChatSettings,
} from "@/redux/slice/chatSlice";

export default function ({ className, url, color, username }: IPropsUserInfo) {
  const [logOut, { isSuccess, isLoading, isError }] = useLogOutMutation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (isSuccess) {
      dispatch(removeUser());
      dispatch(deleteChatSettings());
    }
  }, [isSuccess]);

  return (
    <div className={classes.block}>
      <UserInfoTemplate className={classes.block__user} url={url} color={color} username={username} />
      <div className={classes.block__buttons}>
        <Tooltip
          className="tooltip"
          anchorSelect={`.${classes.button__edit}`}
          place="top"
        >
          Edit your profile
        </Tooltip>
        <Tooltip
          className="tooltip"
          anchorSelect={`.${classes.button__exit}`}
          place="top"
        >
          Exit your profile
        </Tooltip>

        <Link to={"/profile"}>
          <button className={classes.button__edit}>
            <MdModeEdit />
          </button>
        </Link>

        <button
          onClick={() => {
            logOut();
          }}
          className={classes.button__exit}
        >
          <FaPowerOff />
        </button>

        {isError ? "error" : <></>}
      </div>
    </div>
  );
}
