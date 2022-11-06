import { Popup } from "./popup";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { hidePopup } from "../../state/api/userSlice";

export const PopupContainer = () => {
  const dispatch = useAppDispatch();
  const popup = useAppSelector((state) => state.app.popup);

  const handleClose = () => {
    dispatch(hidePopup());
  }

  return <Popup onClose={handleClose} message={popup.message} isOpen={popup.isOpen} type={popup.type}/>;
};
