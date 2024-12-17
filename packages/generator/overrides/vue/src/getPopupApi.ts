import { useContext } from "react";
// @ts-ignore
import PopupContext from "./contexts/popup.context";
import { inject } from "vue";

export default function getPopupApi() {
  return inject(PopupContext.key);
}
