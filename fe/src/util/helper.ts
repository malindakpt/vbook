import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { PopupType } from "../enum/popup.type";
import { showPopup } from "../state/api/userSlice";

export const showErrorFromResponse = (e: unknown, dispatch: Dispatch) => {
  dispatch(
    showPopup({
      type: PopupType.error,
      message: (e as AxiosError)?.response?.data as string,
    })
  );
};
