import { useContext } from "react";
// @ts-ignore
import PopupContext from "./contexts/popup.context";

export default function getPopupApi() {
  return useContext(PopupContext);
}
