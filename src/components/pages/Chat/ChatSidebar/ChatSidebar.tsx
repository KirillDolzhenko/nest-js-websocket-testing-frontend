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

export default function ({ className }: IPropsClassName) {
  let user = useSelector((state: RootState) => state.authSlice.user);

  let [activeModal, setActiveModal] = useState<boolean>(false);

  return (
    <div className={classNames(classes.chatSidebar, className)}>
      <div className={classes.chatSidebar__logo}>
        <Logo className={classes.logo} />
      </div>
      {/* <LineBottom /> */}
      {/* <button>
      </button> */}
      {activeModal ? (
        <ModalFindUser active={activeModal} setActive={setActiveModal}>
          {/* Find contact */}
        </ModalFindUser>
      ) : (
        <></>
      )}
      <div className={classes.chatSidebar__content}>
        <span className={classes.chatSidebar__headerWithBtn}>
          <HeaderCategory>Messages</HeaderCategory>
          <ButtonAdd
            onClick={() => setTimeout(() => setActiveModal(!activeModal))}
          />
        </span>
        <HeaderCategory>Groups</HeaderCategory>
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
