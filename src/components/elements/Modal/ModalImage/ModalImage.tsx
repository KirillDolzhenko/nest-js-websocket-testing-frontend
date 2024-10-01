import useClickOutside from "@/components/hooks/useClickOutside";
import { IPropsModalImage } from "@/types/props/props";
import { IoClose, IoCopyOutline } from "react-icons/io5";
import { MdDownload } from "react-icons/md";

import classes from "./ModalImage.module.scss";
import { useRef } from "react";
import useDownloadFile from "@/components/hooks/useDownloadFile";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import useCopyToBuffer from "@/components/hooks/useCopyToBuffer";

export default function ({
  url,
  active,
   
  className,
  setActive,
}: IPropsModalImage) {
  const ref = useRef<HTMLDivElement>(null);

  console.log("fddf");

  useClickOutside(ref, active, setActive);

  const downloadFile = useDownloadFile(url);

  const copyBufferUrl = useCopyToBuffer(url)

  return (
    <div className={classes.modal}>
      <div ref={ref} className={classes.modal__content}>
        <img className={classes.modal__image} src={url} alt="image" />
        <div className={classes.modal__buttons}>
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.button__close}`}
            place="top"
          >
            Close modal
          </Tooltip>
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.button__copy}`}
            place="top"
          >
            Copy url
          </Tooltip>
          <Tooltip
            className="tooltip"
            anchorSelect={`.${classes.button__download}`}
            place="top"
          >
            Download image
          </Tooltip>
          <button
            className={classes.button__close}
            onClick={() => {
              setActive(false);
            }}
          >
            <IoClose className={classes.svg} />
          </button>
          <button className={classes.button__copy}>
            <a
              onClick={() => {
                copyBufferUrl();
              }}
            >
              <IoCopyOutline className={classNames(classes.svg)} />
            </a>
          </button>
          <button className={classes.button__download}>
            <a onClick={downloadFile}>
              <MdDownload className={classNames(classes.svg)} />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}
