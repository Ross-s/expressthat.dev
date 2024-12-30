import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { SimplePopup } from "../popups/pre/SimplePopup";
import { QuestionPopup } from "../popups/pre/QuestionPopup";
import { ensureRoot } from "../util/ensureRoot";


async function simplePopup(
  title: string,
  message: string,
  confirmText: string,
  type: "success" | "error" | "warning"
) {
  const el = ensureRoot();
  const root = createRoot(el[0]);
  return new Promise<void>((resolve) => {
    root.render(
      <StrictMode>
        <SimplePopup
          title={title}
          message={message}
          confirmText={confirmText}
          type={type}
          onClose={() => {
            root.unmount();
            el[1]();
            resolve();
          }}
        />
      </StrictMode>
    );
  });
};

export async function SuccessPopup(title: string, message: string, confirmText?: string) {
  return await simplePopup(title, message, confirmText ?? "Ok", "success");
}

export async function ErrorPopup(title: string, message: string, confirmText?: string) {
  return await simplePopup(title, message, confirmText ?? "Ok", "error");
}

export async function WarningPopup(title: string, message: string, confirmText?: string) {
  return await simplePopup(title, message, confirmText ?? "Ok", "warning");
}

export async function ConfirmPopup(
  title: string,
  message: string,
  confirmText?: string,
  declineText?: string
) {
  const el = ensureRoot();
  const root = createRoot(el[0]);
  return new Promise<boolean>((resolve) => {
    root.render(
      <StrictMode>
        <QuestionPopup
          title={title}
          message={message}
          confirmText={confirmText ?? "Ok"}
          declineText={declineText ?? "Cancel"}
          onClose={(value: boolean) => {
            root.unmount();
            el[1]();
            resolve(value);
          }}
        />
      </StrictMode>
    );
  });
}

