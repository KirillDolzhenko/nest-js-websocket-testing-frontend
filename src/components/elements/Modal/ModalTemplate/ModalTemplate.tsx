import { IPropsClassName, IPropsModalTemplate } from "@/types/props/props";
import classes from "./ModalTemplate.module.scss";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import ButtonClose from "../../Buttons/ButtonClose/ButtonClose";
import { Tooltip } from "react-tooltip";
import LineBottom from "../../Lines/LineBottom";

export default function ({
  className,
  header,
  active,
  children,
  setActive,
}: IPropsModalTemplate) {
  let refModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log(refModal.current, active);

    function checkClick(e: MouseEvent) {
      console.log(refModal.current, e.target instanceof Node, active);
      if (
        refModal.current &&
        e.target instanceof Node &&
        active &&
        !refModal.current.contains(e.target)
      ) {
        setActive(false);
      }
    }

    document.addEventListener("click", checkClick);

    return () => document.removeEventListener("click", checkClick);
  }, [refModal, active]);

  return (
    <div className={classes.modal__container}>
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
        <div className={classes.modal__children}>{children}</div>
      </div>
    </div>
  );
}
