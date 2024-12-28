import { useEffect, useRef, useState, useTransition } from "react";

export function CustomPopup(props: {
  children: React.ReactNode;
  show?: boolean;
  backdrop?: boolean;
  closeButton?: boolean;
  onClose?: () => Promise<void> | void;
}) {
  const [shouldShow, setShouldShow] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (props.show && !shouldShow) {
      showPopup();
    } else if (!props.show && shouldShow) {
      closePopup();
    }
  }, [props.show, popupRef]);

  function closePopup() {
    startTransition(() => {
      popupRef.current?.classList.remove("show");
      popupRef.current?.classList.add("hide");
    });

    popupRef.current?.addEventListener("animationend", animationComplete);
  }

  function showPopup() {
    setShouldShow(true);
    startTransition(() => {
      popupRef.current?.classList.remove("hide");
      popupRef.current?.classList.add("show");
    });
  }

  async function animationComplete() {
    popupRef.current?.removeEventListener("animationend", animationComplete);

    if (props.onClose) {
      // if onClose is async, we need to wait for it to finish before setting shouldShow to false
      const onCloseResult = props.onClose();
      if (onCloseResult instanceof Promise) {
        await onCloseResult;
      }
    }
    setShouldShow(false);
  }

  return (
    <>
      <div
        className="expressthat-popup container"
        role="dialog"
        aria-modal="true"
        aria-hidden={!shouldShow}
        style={{
          backgroundColor:
            (props.backdrop !== false) ? "rgba(0,0,0,0.4)" : "transparent",
          display: shouldShow ? "grid" : "none",
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closePopup();
          }
        }}
      >
        <div
          ref={popupRef}
          className="expressthat-popup content"
          role="document"
        >
          {(props.closeButton !== false) && (
            <button onClick={closePopup} className="close" aria-label="Close">
              &times;
            </button>
          )}
          {props.children}
        </div>
      </div>
    </>
  );
}
