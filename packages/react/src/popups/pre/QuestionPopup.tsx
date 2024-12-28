import { useState } from "react";
import { CustomPopup } from "../CustomPopup";
import { QuestionMarkIcon } from "./icons/QuestionMarkIcon";

export function QuestionPopup(props: {
  title?: string;
  message?: string;
  confirmText?: string;
  declineText?: string;
  onClose?: (result: boolean) => Promise<void> | void;
}) {
  const [show, setShow] = useState(true);
  const [result, setResult] = useState(false);

  return (
    <CustomPopup
      show={show}
      onClose={() => {
        props.onClose?.(result);
      }}
    >
      <QuestionMarkIcon />
      <h2>{props.title}</h2>
      <p>{props.message}</p>
      <div className="btn-container">
        <button
          onClick={() => {
            setResult(false);
            setShow(false);
          }}
        >
          {props.declineText ?? "Close"}
        </button>
        <button
          onClick={() => {
            setResult(true);
            setShow(false);
          }}
        >
          {props.confirmText ?? "Confirm"}
        </button>
      </div>
    </CustomPopup>
  );
}
