import { getContext } from "svelte";
// @ts-ignore
import PopupContext from "./contexts/popup.context";

export default function getPopupApi() {
  return getContext(PopupContext.key);
}
