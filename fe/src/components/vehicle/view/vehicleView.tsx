import { Card } from "@mui/material";
import { FC } from "react";
import { Vehicle } from "../../../types/Vehicle";

interface Props {
  v: Vehicle;
}

export const VehicleView: FC<Props> = ({ v }) => {
  return <Card>{v.id}</Card>;
};
