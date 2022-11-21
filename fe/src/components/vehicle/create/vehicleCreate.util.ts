import { Vehicle } from "../../../types/Vehicle";

export const sanitizeVehicle = (v: Vehicle) => {
  v.regNo = v.regNo.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  v.chassis = v.chassis.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  return v;
};
