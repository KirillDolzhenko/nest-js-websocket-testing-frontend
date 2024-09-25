import { IPropsClassName, IPropsModalTemplate } from "@/types/props/props";
import classes from "./ModalTemplate.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
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
  overflow = false,
}: IPropsModalTemplate) {
  let refModal = useRef<HTMLDivElement>(null);

  useClickOutside(refModal, active, setActive);

  // useEffect(() => {
  //   function checkClick(e: MouseEvent) {
  //     console.log(refModal.current, e.target instanceof Node, active);
  //     if (
  //       refModal.current &&
  //       e.target instanceof Node &&
  //       active &&
  //       !refModal.current.contains(e.target)
  //     ) {
  //       setActive(false);
  //     }
  //   }

  //   document.addEventListener("click", checkClick);

  //   return () => document.removeEventListener("click", checkClick);
  // }, [active]);

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
