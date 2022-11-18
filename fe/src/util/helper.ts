import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { removeCookie } from "typescript-cookie";
import { PopupType } from "../enum/popup.type";
import { showPopup } from "../state/api/userSlice";
import { fuelTypes, serviceTypes, transmissionTypes, vehicleBrands, vehicleTypes } from "./selectOptions";

export const showErrorFromResponse = (e: unknown, dispatch: Dispatch) => {
  dispatch(
    showPopup({
      type: PopupType.error,
      message: (e as AxiosError)?.response?.data as string,
    })
  );
};

export const clearAllCookies = () => {
  removeCookie("user-token");
  removeCookie("access-token");
  removeCookie("refresh-token");
};

export const dataURLtoFile = (dataurl: any, filename: string) => {
  const arr = dataurl.split(",");

  // @ts-ignore
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  const file = new File([u8arr], filename, { type: mime });
  return file;
};

export const getFormattedDate = (d: Date) => {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};


export const getVehicleTypeLabel = (id: number) => {
  const type = vehicleTypes.find(s=> s.id === id);
  return type ? type.label : 'N/A';
}

export const getServiceTypeLabel = (id: number) => {
  const type = serviceTypes.find(s=> s.id === id);
  return type ? type.label : 'N/A';
}

export const getFuelTypeLabel = (id: number) => {
  const type = fuelTypes.find(s=> s.id === id);
  return type ? type.label : 'N/A';
}

export const getTransmissionTypeLabel = (id: number) => {
  const type = transmissionTypes.find(s=> s.id === id);
  return type ? type.label : 'N/A';
}

export const getVehicleBrandLabel = (id: number) => {
  const type = vehicleBrands.find(s=> s.id === id);
  return type ? type.label : 'N/A';
}