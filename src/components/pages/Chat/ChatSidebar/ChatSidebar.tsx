import { IPropsClassName } from "@/types/props/props";
import classes from "./ChatSidebar.module.scss";
import classNames from "classnames";
import { FaFire, FaPlus } from "react-icons/fa";
import Logo from "@/components/elements/Logo/Logo";
import LineBottom from "@/components/elements/Lines/LineBottom";
import HeaderCategory from "@/components/elements/Headers/HeaderCategory";
import ProfilePicture from "@/components/elements/Picture/ProfilePicture";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import ProfilePictureChatSidebar from "@/components/elements/Picture/ProfilePictureChatSidebar/ProfilePictureChatSidebar";
import UserInfoChatSidebar from "@/components/elements/UserInfo/UserInfoChatSidebar/UserInfoChatSidebar";
import { FiPlus } from "react-icons/fi";
import ButtonAdd from "@/components/elements/Buttons/ButtonAdd/ButtonAdd";
import { useEffect, useRef, useState } from "react";
import ModalTemplate from "@/components/elements/Modal/ModalTemplate/ModalTemplate";
import ModalFindUser from "@/components/elements/Modal/ModalFindUser/ModalFindUser";
import UserInfoSmall from "@/components/elements/UserInfo/UserInfoSmall/UserInfoSmall";
import { EnumDBUserColor } from "@/types/redux/auth";
import UserInfoMessages from "@/components/elements/UserInfo/UserInfoMessages/UserInfoMessages";
import { useGetContactsDirectMutation } from "@/redux/api/chat.api";
import ModalGroupCreation from "@/components/elements/Modal/ModalGroupCreation/ModalGroupCreation";

export default function ({ className }: IPropsClassName) {
  let user = useSelector((state: RootState) => state.authSlice.user);

  let [activeModal, setActiveModal] = useState<boolean>(false);
  let [activeModalGroup, setActiveModalGroup] = useState<boolean>(true);

  let [getContactsDirect, { isLoading, isError, isSuccess, data }] =
    useGetContactsDirectMutation();

  useEffect(() => {
    getContactsDirect();
  }, []);

  return (
    <div className={classNames(classes.chatSidebar, className)}>
      <div className={classes.chatSidebar__logo}>
        <Logo className={classes.logo} />
      </div>

      {activeModal ? (
        <ModalFindUser active={activeModal} setActive={setActiveModal} />
      ) : (
        <></>
      )}

      {activeModalGroup ? (
        <ModalGroupCreation active={activeModal} setActive={setActiveModal} />
      ) : (
        <></>
      )}

      <div className={classes.chatSidebar__content}>
        <span
          className={classNames(
            classes.chatSidebar__headerWithBtn,
            classes.chatSidebar__header
          )}
        >
          <HeaderCategory>Messages</HeaderCategory>
          <ButtonAdd
            onClick={() => setTimeout(() => setActiveModal(!activeModal))}
          />
        </span>
        <span className={classes.usersList}>
          <UserInfoMessages users={data ? data.map((el) => el.user) : []} />
        </span>
        <span
          className={classNames(
            classes.chatSidebar__headerWithBtn,
            classes.chatSidebar__header
          )}
        >
          <HeaderCategory>Groups</HeaderCategory>
          <ButtonAdd
            onClick={() =>
              setTimeout(() => setActiveModalGroup(!activeModalGroup))
            }
          />
        </span>
      </div>
      {user ? (
        <div className={classes.chatSidebar__user}>
          <LineBottom />
          <UserInfoChatSidebar
            url={user.picUrl}
            color={user.picColor}
            username={user.username}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
