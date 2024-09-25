import { IPropsModalFindUser } from "@/types/props/props";
import classes from "./ModalGroupCreation.module.scss";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import InputText from "../../Inputs/InputText";
import { useForm } from "react-hook-form";
import { useCallback, useEffect, useState } from "react";
import {
  SearchUsersSchema,
  SearchUsersSchemaType,
} from "@/validators/searchUsers.validator";
import { zodResolver } from "@hookform/resolvers/zod";

import { debounce } from "lodash";
import {
  useGetAllUsersMutation,
  useSearchUsersMutation,
} from "@/redux/api/auth.api";
import { IDBUser, IRTKQuerySearchUsers } from "@/types/redux/auth";
import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";
import UserInfoSmall from "../../UserInfo/UserInfoSmall/UserInfoSmall";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setDirectChat } from "@/redux/slice/chatSlice";
import {
  GetAllUsersSchema,
  GetAllUsersSchemaType,
} from "@/validators/getAllUsers.validator";
import { MdKeyboardArrowDown } from "react-icons/md";
import classNames from "classnames";
import ButtonForm from "../../Buttons/ButtonForm";
import { IoClose } from "react-icons/io5";

export default function ({
  className,
  active,
  setActive,
}: IPropsModalFindUser) {
  const { register, handleSubmit, watch, control } =
    useForm<GetAllUsersSchemaType>({
      resolver: zodResolver(GetAllUsersSchema),
    });

  const [usersInfo, setUsersInfo] = useState<IDBUser[] | undefined>();
  const [errorSearchState, setErrorSearchState] = useState<any>();

  const [selectedUsers, setSelectedUsers] = useState<IDBUser[]>([]);
  // const [
  //   searchUsers,
  //   { data, isSuccess, isLoading, isError, error: errorSearch },
  // ] = useSearchUsersMutation();

  // let onChangeInput = useCallback(
  //   (request: IRTKQuerySearchUsers) => {
  //     if (request.query) {
  //       searchUsers(request);
  //     } else {
  //       setUsersInfo(undefined);
  //     }
  //   },
  //   [searchUsers]
  // );

  // useEffect(() => {
  //   setErrorSearchState(errorSearch);
  // }, [errorSearch]);

  // let debouceQuery = useCallback(debounce(onChangeInput, 500), [onChangeInput]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     if (value.arrId) {
  //       debouceQuery(value as IRTKQuerySearchUsers);
  //     } else {
  //       debouceQuery.cancel();
  //       setUsersInfo(undefined);
  //       setErrorSearchState(undefined);
  //     }
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);

  // useEffect(() => {
  //   if (data?.length) {
  //     setUsersInfo(data);
  //   }
  // }, [data]);

  const [activeList, setActiveList] = useState<boolean>(true);

  //
  //
  //
  //

  // let dispatch = useDispatch<AppDispatch>();

  let [getAllUsers, { isLoading, isError, isSuccess, data }] =
    useGetAllUsersMutation();

  useEffect(() => {
    if (activeList) {
      getAllUsers({
        arrId: selectedUsers.map((el) => el.id),
      });

      console.log(selectedUsers.map((el) => el.id));
    }
  }, [activeList, selectedUsers]);

  let onClickUser = useCallback((el: IDBUser) => {
    setSelectedUsers((selectedUsers) => [...selectedUsers, el]);
  }, []);

  let onClickRemoveUser = useCallback((id: string) => {
    setSelectedUsers((selectedUsers) =>
      selectedUsers.filter((el) => el.id !== id)
    );
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <ModalTemplate
      className={className}
      header={"Create group"}
      active={active}
      setActive={setActive}
    >
      <>
        <div className={classes.modal__content}>
          <InputText placeholder="Title" type="text" />
          <InputText placeholder="Members" type="text" />
        </div>

        <div className={classes.select}>
          <div
            className={classes.select__display}
            // onClick={() => {
            //   setActiveList(!activeList);
            // }}
          >
            {selectedUsers.map((el) => (
              <span
                className={classNames(classes.select__user, classes.selectUser)}
              >
                <span className={classes.selectUser__text}>{el.username}</span>

                <button
                  className={classes.selectUser__button}
                  onClick={() => onClickRemoveUser(el.id)}
                >
                  <IoClose />
                </button>
              </span>
            ))}
            <span
              className={classes.select__messaseBlock}
              onClick={() => {
                setActiveList(!activeList);
              }}
            >
              <span className={classes.select__text}>Select users</span>
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
              <div
                className={classNames(classes.select__list, classes.selectList)}
              >
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
                      />
                    </div>
                  ))}
                  {/* <UserInfoSmall
                  className={classes.selectList__item}
                  username="Vasya"
                />
                <UserInfoSmall
                  className={classes.selectList__item}
                  username="Vasya"
                />
                <UserInfoSmall
                  className={classes.selectList__item}
                  username="Vasya"
                />
                <UserInfoSmall
                  className={classes.selectList__item}
                  username="Vasya"
                /> */}
                </div>
              </div>
            ) : (
              <div
                className={classNames(classes.select__list, classes.selectList)}
              >
                There is no users left
              </div>
            )
          ) : (
            <></>
          )}
        </div>
        <ButtonForm>Create</ButtonForm>
      </>
      {/* <div className={classes.modal__content}>
        <form
          onSubmit={handleSubmit((data) => {
            debouceQuery.cancel();
            onChangeInput(data);
          })}
        >
          <InputText
            register={register("query", { required: true })}
            placeholder="Username"
            className={classes.modal__input}
            type="text"
          />
        </form>
        {isLoading ? (
          <div className={classes.modal__message}>Loading...</div>
        ) : errorSearchState ? (
          <div className={classes.modal__message}>
            {RTKGetErrorMessage(errorSearch)}
          </div>
        ) : usersInfo ? (
          <div className={classes.modal__users}>
            {usersInfo.map((el) => (
              <button
                onClick={() => {
                  dispatch(setDirectChat(el));
                  setActive(false);
                }}
              >
                <UserInfoSmall
                  className={classes.foundedUser}
                  username={el.username}
                  color={el.picColor}
                  url={el.picUrl}
                />
              </button>
            ))}
          </div>
        ) : (
          <></>
        )}
      </div> */}
    </ModalTemplate>
  );
}
