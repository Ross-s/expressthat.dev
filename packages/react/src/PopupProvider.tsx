import { useState } from "react";
import { PopupContext } from "./contexts/PopupContext";
import { QuestionPopup } from "./popups/pre/QuestionPopup";
import { SimplePopup } from "./popups/pre/SimplePopup";

export function PopupProvider(props: { children: React.ReactNode }) {
  const [popupToShow, setPopupToShow] = useState<
    undefined | "success" | "error" | "question" | "warning"
  >();
  const [shouldShow, setShouldShow] = useState(false);
  const [text, setText] = useState<
    | {
        title: string;
        message: string;
        confirmText?: string;
        declineText?: string;
      }
    | undefined
  >();
  const [onPopupResult, setOnPopupResult] =
    useState<(result?: boolean) => PromiseLike<void | boolean> | object>();

  function onPopupClose(result?: boolean) {
    setShouldShow(false);
    setPopupToShow(undefined);
    if (onPopupResult) {
      if (result !== undefined) {
        onPopupResult?.(result);
      } else {
        onPopupResult?.();
      }
    }
  }

  async function ShowSimplePopup(
    type: "success" | "error" | "question" | "warning",
    title: string,
    message: string,
    confirmText?: string
  ) {
    setPopupToShow(type);
    setShouldShow(true);
    setText({ title, message, confirmText });
    return new Promise<void>((resolve) => {
      setOnPopupResult(() => resolve);
    });
  }

  return (
    <PopupContext.Provider
      value={{
        Success: async (title: string, message: string, confirmText?: string) =>
          await ShowSimplePopup("success", title, message, confirmText),
        Error: async (title: string, message: string, confirmText?: string) =>
          await ShowSimplePopup("error", title, message, confirmText),
        Warning: async (title: string, message: string, confirmText?: string) =>
          await ShowSimplePopup("warning", title, message, confirmText),
        Confirm: async (
          title: string,
          message: string,
          confirmText?: string,
          declineText?: string
        ) => {
          setPopupToShow("question");
          setShouldShow(true);
          setText({ title, message, confirmText, declineText });
          return new Promise<boolean>((resolve) => {
            setOnPopupResult(() => (value: boolean) => resolve(value));
          });
        },
      }}
    >
      {shouldShow && (
        <>
          {["warning", "error", "success"].includes(popupToShow ?? "") && (
            <SimplePopup
            key={popupToShow}
              type={popupToShow as any}
              confirmText={text?.confirmText}
              message={text?.message}
              title={text?.title}
              onClose={onPopupClose}
            />
          )}
          {popupToShow === "question" && (
            <QuestionPopup
              onClose={onPopupClose}
              message={text?.message}
              title={text?.title}
              confirmText={text?.confirmText}
              declineText={text?.declineText}
            />
          )}
        </>
      )}
      {props.children}
    </PopupContext.Provider>
  );
}
