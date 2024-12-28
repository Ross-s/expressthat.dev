import { useContext } from "react";
import { PopupContext } from "../contexts/PopupContext";

export function usePopup() {
  const context = useContext(PopupContext);
  return context;
}
