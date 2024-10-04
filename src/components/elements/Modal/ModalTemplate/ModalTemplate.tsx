import { IPropsModalTemplate } from "@/types/props/props";
import classes from "./ModalTemplate.module.scss";
import { useRef } from "react";
import ButtonClose from "../../Buttons/ButtonClose/ButtonClose";
import { Tooltip } from "react-tooltip";
import LineBottom from "../../Lines/LineBottom";
import useClickOutside from "@/components/hooks/useClickOutside";
import classNames from "classnames";

export default function ({
  className,
  header,
  active,
  children,
  setActive,
}: IPropsModalTemplate) {
  const refModal = useRef<HTMLDivElement>(null);

  useClickOutside(refModal, active, setActive);

  return (
    <div className={classNames(classes.modal__container, className)}>
      <Tooltip
        className="tooltip"
        anchorSelect={`.${classes.modal__close}`}
        place="top"
      >
        Close modal
      </Tooltip>
      <div ref={refModal} className={classes.modal}>
        <div className={classes.modal__header}>
          <h5>{header}</h5>
          <ButtonClose
            className={classes.modal__close}
            onClick={() => setActive(false)}
          />
        </div>
        <LineBottom />
        <div className={classNames(classes.modal__children, classes.overflow)}>
          {children}
        </div>
      </div>
    </div>
  );
}
