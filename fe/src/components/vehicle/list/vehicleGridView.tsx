import {
  Box,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Vehicle } from "../../../types/Vehicle";
import {
  getFuelTypeLabel,
  getTransmissionTypeLabel,
  getVehicleBrandLabel,
  getVehicleTypeLabel,
} from "../../../util/helper";

interface Props {
  v: Vehicle;
  onSelect: (v: Vehicle) => void;
}

export const VehicleGridView: FC<Props> = ({ v, onSelect }) => {
  return (
    <Box sx={{ margin: 1 }} onClick={() => onSelect(v)}>
      <CardHeader title={v.regNo} subheader={getVehicleTypeLabel(v.type)} />
      {v.imageCount > 0 && (
        <CardMedia
          sx={{
            height: "200px",
          }}
          image={`${config.imageUrlPrefix}v-${v.id}-0.jpg?${v.updatedAt}`}
        />
      )}
      <CardContent>
        <Typography variant="body2">{`brand: ${getVehicleBrandLabel(
          v.brand
        )}`}</Typography>
        <Typography variant="body2">{`Manufactured: ${v.manufac}`}</Typography>
        <Typography variant="body2">{`fuel: ${getFuelTypeLabel(
          v.fuel
        )}`}</Typography>
        <Typography variant="body2">{`transmission: ${getTransmissionTypeLabel(
          v.transmission
        )}`}</Typography>
      </CardContent>

      <Divider variant="middle" />
    </Box>
  );
};
