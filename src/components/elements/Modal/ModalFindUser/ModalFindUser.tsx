import { IPropsModalFindUser, IPropsModalTemplate } from "@/types/props/props";
import classes from "./ModalFindUser.module.scss";
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
import { useSearchUsersMutation } from "@/redux/api/auth.api";
import { IDBUser, IRTKQuerySearchUsers } from "@/types/redux/auth";
import { RTKGetErrorMessage } from "@/redux/api/assets/RTKGetErrorMessage";
import UserInfoTemplate from "../../UserInfo/UserInfoTemplate/UserInfoTemplate";
import UserInfoSmall from "../../UserInfo/UserInfoSmall/UserInfoSmall";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setDirectChat } from "@/redux/slice/chatSlice";

export default function ({
  className,
  active,
  setActive,
}: IPropsModalFindUser) {
  const { register, handleSubmit, watch } = useForm<SearchUsersSchemaType>({
    resolver: zodResolver(SearchUsersSchema),
  });

  const [usersInfo, setUsersInfo] = useState<IDBUser[] | undefined>();
  const [errorSearchState, setErrorSearchState] = useState<any>();

  const [
    searchUsers,
    { data, isSuccess, isLoading, isError, error: errorSearch },
  ] = useSearchUsersMutation();

  let onChangeInput = useCallback(
    (request: IRTKQuerySearchUsers) => {
      if (request.query) {
        searchUsers(request);
      } else {
        setUsersInfo(undefined);
      }
    },
    [searchUsers]
  );

  useEffect(() => {
    setErrorSearchState(errorSearch);
  }, [errorSearch]);

  let debouceQuery = useCallback(debounce(onChangeInput, 500), [onChangeInput]);

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.query) {
        debouceQuery(value as IRTKQuerySearchUsers);
      } else {
        debouceQuery.cancel();
        setUsersInfo(undefined);
        setErrorSearchState(undefined);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (data?.length) {
      setUsersInfo(data);
    }
  }, [data]);

  //
  //
  //
  //

  let dispatch = useDispatch<AppDispatch>();

  return (
    <ModalTemplate
      className={className}
      header={"Find user"}
      active={active}
      setActive={setActive}
    >
      <div className={classes.modal__content}>
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
      </div>
    </ModalTemplate>
  );
}
