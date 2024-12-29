import { lazy, useState } from "react";

const ErrorIcon =  lazy(() => import("./icons/ErrorIcon"));
const WarningIcon =  lazy(() => import("./icons/WarningIcon"));
const SuccessIcon =  lazy(() => import("./icons/SuccessIcon"));
const CustomPopup =  lazy(() => import("../CustomPopup"));

export default function SimplePopup(props: {
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
