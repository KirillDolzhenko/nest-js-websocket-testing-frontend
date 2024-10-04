import classNames from "classnames";
import classes from "./InputSelect.module.scss";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import UserInfoSmall from "../../UserInfo/UserInfoSmall/UserInfoSmall";
import { useGetAllUsersMutation } from "@/redux/api/auth.api";
import { useCallback, useEffect, useState } from "react";
import { IDBUser } from "@/types/redux/auth";
import { IPropsInputSelect } from "@/types/props/props";
import ErrorText from "../ErrorText/ErrorText";

export default function ({
  onChange,
  error,
  active = true,
}: IPropsInputSelect) {
  const [selectedUsers, setSelectedUsers] = useState<IDBUser[]>([]);
  const [activeList, setActiveList] = useState<boolean>(false);

  const [getAllUsers, { isLoading, isError, isSuccess, data }] =
    useGetAllUsersMutation();

  useEffect(() => {
    if (activeList) {
      getAllUsers({
        arrId: selectedUsers.map((el) => el.id),
      });
    }
  }, [activeList, selectedUsers]);

  const onClickUser = useCallback((el: IDBUser) => {
    setSelectedUsers((selectedUsers) => [...selectedUsers, el]);
  }, []);

  const onClickRemoveUser = useCallback((id: string) => {
    setSelectedUsers((selectedUsers) =>
      selectedUsers.filter((el) => el.id !== id)
    );
  }, []);

  useEffect(() => {
    if (onChange) {
      onChange(selectedUsers.map((el) => el.id));
    }
  }, [selectedUsers]);

  return (
    <div className={classes.select}>
      <div className={classes.select__display}>
        <div className={classes.select__selected}>
          {selectedUsers.map((el) => (
            <span
              className={classNames(classes.select__user, classes.selectUser)}
            >
              <span className={classes.selectUser__text}>{el.username}</span>

              <button
                type="button"
                className={classes.selectUser__button}
                onClick={() => onClickRemoveUser(el.id)}
              >
                <IoClose />
              </button>
            </span>
          ))}
        </div>
        <span
          className={classes.select__messaseBlock}
          onClick={() => {
            setActiveList(!activeList);
          }}
        >
          <span className={classes.select__text}>Select members</span>
          <div
            className={classNames(
              classes.select__svg,
              activeList ? classes.active : ""
            )}
          >
            <MdKeyboardArrowDown />
          </div>
        </span>
      </div>
      {activeList && isSuccess ? (
        data?.length ? (
          <div className={classNames(classes.select__list, classes.selectList)}>
            <div className={classes.selectList__items}>
              {data.map((el) => (
                <div
                  className={classes.selectList__item}
                  onClick={() => {
                    onClickUser(el);
                  }}
                >
                  <UserInfoSmall
                    key={el.id}
                    username={el.username}
                    color={el.picColor}
                    url={el.picUrl}
                    desc={el.email}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={classNames(classes.select__list, classes.selectList)}>
            <div className={classes.selectList__noUsers}>
              There is no users left
            </div>
          </div>
        )
      ) : (
        <></>
      )}
      {error && !activeList ? <ErrorText>{error}</ErrorText> : <></>}
    </div>
  );
}
