import { IPropsClassName } from "@/types/props/props";
import classes from "./ChatSidebar.module.scss";
import classNames from "classnames";
import Logo from "@/components/elements/Logo/Logo";
import LineBottom from "@/components/elements/Lines/LineBottom";
import HeaderCategory from "@/components/elements/Headers/HeaderCategory";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import UserInfoChatSidebar from "@/components/elements/UserInfo/UserInfoChatSidebar/UserInfoChatSidebar";
import ButtonAdd from "@/components/elements/Buttons/ButtonAdd/ButtonAdd";
import { useEffect, useState } from "react";
import ModalFindUser from "@/components/elements/Modal/ModalFindUser/ModalFindUser";
import UserInfoMessages from "@/components/elements/UserInfo/UserInfoMessages/UserInfoMessages";
import { useGetContactsDirectQuery } from "@/redux/api/chat.api";
import ModalGroupCreation from "@/components/elements/Modal/ModalGroupCreation/ModalGroupCreation";
import { useGetAllGroupsQuery } from "@/redux/api/group.api";
import GroupInfoMessages from "@/components/elements/GroupInfo/GroupInfoMessages/GroupInfoMessages";
import { setChatsDirect, setChatsGroup } from "@/redux/slice/chatSlice";

export default function ({ className }: IPropsClassName) {
  const user = useSelector((state: RootState) => state.authSlice.user);
  const chatsDirect = useSelector(
    (state: RootState) => state.chatSlice.chatsDirect
  );
  const chatsGroup = useSelector(
    (state: RootState) => state.chatSlice.chatsGroup
  );

  const dispatch = useDispatch<AppDispatch>();

  const [activeModal, setActiveModal] = useState<boolean>(false);
  const [activeModalGroup, setActiveModalGroup] = useState<boolean>(false);

  const { data: dataDirect } = useGetContactsDirectQuery();
  const { data: dataGroups } = useGetAllGroupsQuery();

  useEffect(() => {
    if (dataGroups) {
      dispatch(setChatsGroup(dataGroups));
    }
  }, [dataGroups]);

  useEffect(() => {
    if (dataDirect) {
      dispatch(setChatsDirect(dataDirect));
    }
  }, [dataDirect]);

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
        <ModalGroupCreation
          active={activeModalGroup}
          setActive={setActiveModalGroup}
        />
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
          {chatsDirect ? <UserInfoMessages userMes={chatsDirect} /> : []}
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

        <span className={classes.usersList}>
          {chatsGroup ? <GroupInfoMessages groups={chatsGroup} /> : []}
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
