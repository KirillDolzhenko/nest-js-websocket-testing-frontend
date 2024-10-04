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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setPicColor, setPicProfile } from "@/redux/slice/authSlice";
import ErrorText from "../../Inputs/ErrorText/ErrorText";
import SuccessText from "../../Inputs/SuccessText/SuccessText";
import LoadingText from "../../Inputs/LoadingText/LoadingText";
import WhiteText from "../../Inputs/WhiteText/WhiteText";
// import { RootState } from "@reduxjs/toolkit/query";

export default function ({ user }: IPropsSettingsProfile) {
  const dispatch = useDispatch<AppDispatch>();

  const userPic = useSelector(
    (state: RootState) => state.authSlice.user?.picUrl
  );

  const [activeUpload, setActiveUpload] = useState<boolean>(false);
  // const [deletedState, setDeletedState] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  // useEffect(() => {
  //   console.log(
  //     {
  //       username: user.username,
  //       email: user.email,
  //       picUrl: user.picUrl,
  //       picColor: user.picColor,
  //     },
  //     "RHFF"
  //   );
  // }, []);

  const {
    register: registerChangeProfile,
    handleSubmit: handleSubmitChangeProfile,
    formState: { errors: errorsChangeProfile },
    control,
    watch,
  } = useForm<ChangeProfileSchemaType>({
    resolver: zodResolver(ChangeProfileSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      picUrl: user.picUrl,
      picColor: user.picColor,
    },
  });

  // useEffect(() => {
  //   console.log(errorsChangeProfile);
  // }, [errorsChangeProfile]);

  const [
    uploadPicture,
    {
      // isError: isErrorUploadPicture,
      // isSuccess: isSuccessUploadPicture,

      // isLoading: isLoadingUploadPicture,
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

  // useEffect(() => {
  //   if (dataUpdateProfile) {
  //     console.log(dataUpdateProfile);
  //   }
  // }, [dataUpdateProfile]);

  const { field } = useController({
    name: "picUrl",
    control,
  });

  useEffect(() => {
    field.onChange(userPic ? userPic : "");
  }, [userPic]);

  useEffect(() => {
    if (dataUploadPicture) {
      dispatch(setPicProfile(dataUploadPicture.file.path));
      // setDeletedState(false);
    }
  }, [dataUploadPicture]);

  const onSumbitChangeProfile = useCallback((data: IRTKQueryUpdateProfile) => {
    updateProfile(data);
  }, []);

  const [changed, setChanged] = useState<boolean>(false);

  const formChanges = watch();

  useEffect(() => {
    console.log("Changes", formChanges);
    console.log("User", user);

    if (
      formChanges.email !== user.email ||
      formChanges.username !== user.username ||
      formChanges.picColor !== user.picColor ||
      formChanges.picUrl !== user.picUrl
    ) {
      setChanged(true);
    } else {
      setChanged(false);
    }
  }, [formChanges, user]);

  return (
    <section className={classes.settings}>
      {/* <h3>Profile settings</h3> */}
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
                          console.log("999999999999999");
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
                        dispatch(setPicProfile(undefined));
                        // setDeletedState(true);
                      }}
                      className={classes.image__delete}
                    ></button>
                  </>
                )
              ) : (
                <></>
              )}

              {!user.picUrl ? (
                !activeUpload ? (
                  <span>{user.username.slice(0, 1).toUpperCase()}</span>
                ) : (
                  <></>
                )
              ) : (
                <img
                  className={classNames(
                    classes.image__picture,
                    activeUpload ? classes.darker : ""
                  )}
                  src={user.picUrl}
                  alt="profilePicture"
                />
              )}
            </div>
          </div>
          <div className={classes.inputs}>
            <InputText
              register={registerChangeProfile("username")}
              type="text"
              placeholder="Nickname"
            />
            <InputText
              register={registerChangeProfile("email")}
              type="text"
              placeholder="Email"
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

        <ButtonForm type="submit">Change</ButtonForm>
        <span className={classes.status}>
          {changed ? (
            <WhiteText>Unsaved changes</WhiteText>
          ) : isLoadingUpdateProfile || isLoadingPicProfile ? (
            <LoadingText />
          ) : isErrorUpdateProfile || isErrorPicProfile ? (
            <ErrorText>Error occured</ErrorText>
          ) : isSuccessUpdateProfile ? (
            <SuccessText>Saved</SuccessText>
          ) : (
            ""
          )}
        </span>
      </form>
    </section>
  );
}
