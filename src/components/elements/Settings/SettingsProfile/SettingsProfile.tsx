import { IPropsSettingsProfile } from "@/types/props/props";
import classes from "./SettingsProfile.module.scss";
import classNames from "classnames";
import InputText from "../../Inputs/InputText";
import ButtonForm from "../../Buttons/ButtonForm";
import { useCallback, useEffect, useState } from "react";
import { iconPlus, iconRemove } from "@/config/icons";
import { Controller, useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useRemovePicProfileMutation,
  useUpdateProfileMutation,
} from "@/redux/api/auth.api";
import {
  ChangeProfileSchema,
  ChangeProfileSchemaType,
} from "@/validators/changeProfile.validator";
import { EnumDBUserColor, IRTKQueryUpdateProfile } from "@/types/redux/auth";
import { useUploadPictureMutation } from "@/redux/api/files.api";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setPicColor, setPicProfile } from "@/redux/slice/authSlice";

export default function ({ user }: IPropsSettingsProfile) {
  const dispatch = useDispatch<AppDispatch>();

  const [activeUpload, setActiveUpload] = useState<boolean>(false);
  // const [deletedState, setDeletedState] = useState<boolean>(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  useEffect(() => {
    console.log(
      {
        username: user.username,
        email: user.email,
        picUrl: user.picUrl,
        picColor: user.picColor,
      },
      "RHFF"
    );
  }, []);

  let {
    register: registerChangeProfile,
    handleSubmit: handleSubmitChangeProfile,
    formState: { errors: errorsChangeProfile },
    control,
  } = useForm<ChangeProfileSchemaType>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      picUrl: user.picUrl,
      picColor: user.picColor,
    },
  });

  useEffect(() => {
    console.log(errorsChangeProfile);
  }, [errorsChangeProfile]);

  const [
    uploadPicture,
    {
      // isError: isErrorUploadPicture,
      // isSuccess: isSuccessUploadPicture,
      isLoading: isLoadingUploadPicture,
      data: dataUploadPicture,
    },
  ] = useUploadPictureMutation();

  const [
    updateProfile,
    {
      isError: isErrorUpdateProfile,
      isSuccess: isSuccessUpdateProfile,
      isLoading: isLoadingUpdateProfile,
      data: dataUpdateProfile,
    },
  ] = useUpdateProfileMutation();

  const [
    removePicProfile,
    {
      isError: isErrorPicProfile,
      // isSuccess: isSuccessPicProfile,
      isLoading: isLoadingPicProfile,
    },
  ] = useRemovePicProfileMutation();

  const { field } = useController({
    name: "picUrl",
    control,
  });

  useEffect(() => {
    if (user.picUrl) {
      field.onChange(user.picUrl);
    }
  }, [user.picUrl]);

  useEffect(() => {
    if (dataUploadPicture) {
      dispatch(setPicProfile(dataUploadPicture.file.path));
      // setDeletedState(false);
    }
  }, [dataUploadPicture]);

  let onSumbitChangeProfile = useCallback((data: IRTKQueryUpdateProfile) => {
    if (user.picUrl) {
      data.picUrl = undefined;
      removePicProfile();
    }

    updateProfile(data);
  }, []);

  return (
    <section className={classes.settings}>
      <h3>Настройки страницы</h3>
      <form
        onSubmit={handleSubmitChangeProfile(onSumbitChangeProfile)}
        className={classes.settings__form}
      >
        <div className={classes.settings__content}>
          <div className={classNames(classes.settings__image, classes.image)}>
            <div
              onMouseEnter={() => {
                setActiveUpload(true);
              }}
              onMouseLeave={() => {
                setActiveUpload(false);
              }}
              className={classNames(
                classes.image__toggle,
                classes[`color_${user.picColor.toLowerCase()}`]
              )}
            >
              {activeUpload ? (
                !user.picUrl ? (
                  <>
                    <svg className={classes.image__icon}>
                      <use href={`${iconPlus}#icon`} />
                    </svg>
                    <input
                      className={classes.image__input}
                      type="file"
                      accept=".png,.jpg,.jpeg,.webp"
                      onChange={(e: any) => {
                        if (
                          e.target.files[0] &&
                          e.target.files[0].size < 5000000
                        ) {
                          uploadPicture({ file: e.target.files[0] });
                        }
                      }}
                    />
                  </>
                ) : (
                  <>
                    <svg className={classes.image__icon}>
                      <use href={`${iconRemove}#icon`} />
                    </svg>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(setPicProfile(null));
                        // setDeletedState(true);
                      }}
                      className={classes.image__delete}
                    ></button>
                  </>
                )
              ) : (
                <></>
              )}

              {user.picUrl ? (
                <img
                  className={classNames(
                    classes.image__picture,
                    activeUpload ? classes.darker : ""
                  )}
                  src={user.picUrl}
                  alt="profilePicture"
                />
              ) : activeUpload ? (
                !isLoadingUploadPicture ? (
                  <>
                    <svg className={classes.image__icon}>
                      <use href={`${iconPlus}#icon`} />
                    </svg>
                  </>
                ) : (
                  "Загрузка..."
                )
              ) : (
                <span>{user.username.slice(0, 1).toUpperCase()}</span>
              )}
            </div>
          </div>
          <div className={classes.inputs}>
            <InputText
              register={registerChangeProfile("username")}
              type="text"
              placeholder="Ник"
            />
            <InputText
              register={registerChangeProfile("email")}
              type="text"
              placeholder="Почта"
            />

            <Controller
              control={control}
              name="picColor"
              render={({ field: fieldColor }) => {
                return (
                  <div className={classes.radios}>
                    <div
                      className={classNames(
                        classes.radios__el,
                        classes[EnumDBUserColor.BLUE]
                      )}
                    >
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            fieldColor.onChange(EnumDBUserColor.BLUE);
                            dispatch(setPicColor(EnumDBUserColor.BLUE));
                          }
                        }}
                        type="radio"
                        name="pic"
                        defaultChecked={
                          fieldColor.value === EnumDBUserColor.BLUE
                        }
                      />
                    </div>
                    <div
                      className={classNames(
                        classes.radios__el,
                        classes[EnumDBUserColor.GREEN]
                      )}
                    >
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            fieldColor.onChange(EnumDBUserColor.GREEN);
                            dispatch(setPicColor(EnumDBUserColor.GREEN));
                          }
                        }}
                        type="radio"
                        name="pic"
                        defaultChecked={
                          fieldColor.value === EnumDBUserColor.GREEN
                        }
                      />
                    </div>
                    <div
                      className={classNames(
                        classes.radios__el,
                        classes[EnumDBUserColor.RED]
                      )}
                    >
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            fieldColor.onChange(EnumDBUserColor.RED);
                            dispatch(setPicColor(EnumDBUserColor.RED));
                          }
                        }}
                        type="radio"
                        name="pic"
                        defaultChecked={
                          fieldColor.value === EnumDBUserColor.RED
                        }
                      />
                    </div>
                    <div
                      className={classNames(
                        classes.radios__el,
                        classes[EnumDBUserColor.YELLOW]
                      )}
                    >
                      <input
                        onChange={(e) => {
                          if (e.target.checked) {
                            fieldColor.onChange(EnumDBUserColor.YELLOW);
                            dispatch(setPicColor(EnumDBUserColor.YELLOW));
                          }
                        }}
                        type="radio"
                        name="pic"
                        defaultChecked={
                          fieldColor.value === EnumDBUserColor.YELLOW
                        }
                      />
                    </div>
                  </div>
                );
              }}
            ></Controller>
          </div>
        </div>

        <ButtonForm type="submit">Изменить</ButtonForm>
        <span className={classes.status}>
          {isLoadingUpdateProfile || isLoadingPicProfile ? (
            <span>Загрузка...</span>
          ) : isErrorUpdateProfile || isErrorPicProfile ? (
            <span className={classes.status__error}>Произошла ошибка</span>
          ) : isSuccessUpdateProfile ? (
            <span className={classes.status__success}>Сохранено</span>
          ) : (
            ""
          )}
        </span>
      </form>
    </section>
  );
}
