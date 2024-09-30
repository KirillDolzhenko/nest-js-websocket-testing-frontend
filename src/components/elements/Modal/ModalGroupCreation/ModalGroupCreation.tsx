import { IPropsModalFindUser } from "@/types/props/props";
import classes from "./ModalGroupCreation.module.scss";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import InputText from "../../Inputs/InputText";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateGroupSchema,
  CreateGroupSchemaType,
} from "@/validators/getAllUsers.validator";
import ButtonForm from "../../Buttons/ButtonForm";
import InputSelect from "../../Inputs/InputSelect/InputSelect";
import { useCallback, useEffect } from "react";
import { IRTKCreateGroup } from "@/types/redux/message";
import { useCreateGroupMutation } from "@/redux/api/group.api";

export default function ({
  className,
  active,
  setActive,
}: IPropsModalFindUser) {
  const {
    register,
    getValues,
    handleSubmit,
    // watch,
    control,
    formState: { errors },
  } = useForm<CreateGroupSchemaType>({
    resolver: zodResolver(CreateGroupSchema),
  });

  const { field } = useController({ name: "members", control });

  const [createGroup, { isSuccess, isError, isLoading, data }] =
    useCreateGroupMutation();

  let onSubmitGroup = useCallback((data: IRTKCreateGroup) => {
    createGroup(data);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      console.log("RESPONSE", data);
      setActive(false);
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
        <form onSubmit={handleSubmit(onSubmitGroup)}>
          <div className={classes.modal__content}>
            <InputText
              type="text"
              register={register("title")}
              placeholder="Title"
              error={errors.title?.message}
            />
            <InputSelect
              onChange={field.onChange}
              error={errors.members?.message}
            />
          </div>

          <ButtonForm
            onClick={() => {
              console.log("FFF", getValues());
            }}
            type="submit"
          >
            Create
          </ButtonForm>
        </form>
      </>
    </ModalTemplate>
  );
}
