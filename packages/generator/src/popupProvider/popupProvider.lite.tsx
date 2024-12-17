import PopupContext from "../contexts/popup.context.lite";
import CustomPopup from "../customPopup/custompopup.lite";

export default function PopupProvider(props) {
  return (
    <PopupContext.Provider
      value={{
        Success() {
          alert("Success");
        },
      }}
    >
      {props.children}
      <CustomPopup>
        <p>test</p>
        </CustomPopup>
    </PopupContext.Provider>
  );
}
