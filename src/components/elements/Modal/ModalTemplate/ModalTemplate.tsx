import { IPropsClassName, IPropsModalTemplate } from "@/types/props/props";
import classes from "./ModalTemplate.module.scss";
import { useEffect, useRef, useState } from "react";

export default function ({
  className,
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
    <>
      {active ? (
        <div ref={refModal} className={classes.modal}>
          {children}
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
