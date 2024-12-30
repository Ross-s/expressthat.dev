import { useState } from "react";
import { CustomPopup } from "../CustomPopup";
import { ErrorIcon } from "./icons/ErrorIcon";
import { SuccessIcon } from "./icons/SuccessIcon";
import { WarningIcon } from "./icons/WarningIcon";


export function SimplePopup(props: {
  title?: string;
  message?: string;
  confirmText?: string;
  onClose?: () => Promise<void> | void;
  type: "warning" | "error" | "success";
}) {
  const [show, setShow] = useState(true);

  return (
    <CustomPopup show={show} onClose={props.onClose}>
      <div className="pre-build">
        {props.type === "error" && <ErrorIcon />}
        {props.type === "warning" && <WarningIcon />}
        {props.type === "success" && <SuccessIcon />}
        <h2>{props.title}</h2>
        <p>{props.message}</p>
        <div className="btn-container">
          <button onClick={() => setShow(false)}>
            {props.confirmText ?? "Ok"}
          </button>
        </div>
      </div>
    </CustomPopup>
  );
}
