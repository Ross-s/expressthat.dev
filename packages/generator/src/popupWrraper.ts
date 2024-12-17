import getPopupApi from "./getPopupApi";

export function usePopup() {
  const popupApi = getPopupApi();
  return popupApi;
}
