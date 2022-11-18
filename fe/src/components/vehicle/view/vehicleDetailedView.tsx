import {
  Button,
  CardActions,
  Container,
  Paper,
  styled,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Vehicle } from "../../../types/Vehicle";
import {
  getFuelTypeLabel,
  getVehicleBrandLabel,
  getVehicleTypeLabel,
} from "../../../util/helper";

interface Props {
  vehicle: Vehicle;
  loading: boolean;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onAddRecord: (vehicle: Vehicle) => void;
  onViewRecord: (vehicle: Vehicle) => void;
}
export const VehicleDetailedView: FC<Props> = ({
  loading,
  vehicle,
  onEdit,
  onDelete,
  onAddRecord,
  onViewRecord,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (vehicle) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4">{vehicle.regNo}</Typography>
        <Typography variant="h5">
          Fuel: {getFuelTypeLabel(vehicle.fuel)}
        </Typography>

        {vehicle.imageCount > 0 && (
          <CardMedia
            sx={{
              height: "400px",
            }}
            image={`${config.imageUrlPrefix}v-${vehicle.id}-0.jpg`}
          />
        )}

        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">
              Type: {getVehicleTypeLabel(vehicle.type)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">
              Manufacturing Year: {vehicle.manufac}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">
              Make: {getVehicleBrandLabel(vehicle.brand)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">
              Chassis No: {vehicle.chassis}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">Model: {vehicle.model}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="subtitle1">
              Type: {getVehicleTypeLabel(vehicle.type)}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={3}>
            <Button onClick={() => onAddRecord(vehicle)} size="small">
              Add Record
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => onViewRecord(vehicle)} size="small">
              View Records
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => onEdit(vehicle)} size="small">
              Edit Vehicle
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button onClick={() => onDelete(vehicle)} size="small">
              Delete Vehicle
            </Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
