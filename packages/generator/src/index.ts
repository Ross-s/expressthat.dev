export { default as PopupProvider } from "./popupProvider/popupProvider.lite";
export { default as CustomPopup } from "./customPopup/custompopup.lite";
export { default as PopupContext } from "./contexts/popup.context.lite";
import { usePopup } from "./popupWrraper";
const Popup = usePopup as unknown as () => {
  Success(): void;
};

export { Popup as usePopup };
