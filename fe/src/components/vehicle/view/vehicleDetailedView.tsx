import {
  Button,
  Container,
  Grid,
  Typography,
  CardMedia,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Vehicle } from "../../../types/Vehicle";
import { Record } from "../../../types/Record";
import {
  getFuelTypeLabel,
  getVehicleBrandLabel,
  getVehicleTypeLabel,
} from "../../../util/helper";
import { RecordsListContainer } from "../../record/list/recordsList.container";

interface Props {
  vehicle: Vehicle;
  loading: boolean;
  historyData: Record[];
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onAddRecord: (vehicle: Vehicle) => void;
  onViewRecord: (vehicle: Vehicle) => void;
  onShowHistory: (vehicle: Vehicle) => void;
}
export const VehicleDetailedView: FC<Props> = ({
  loading,
  vehicle,
  historyData,
  onEdit,
  onDelete,
  onAddRecord,
  onViewRecord,
  onShowHistory,
}) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (vehicle) {
    return (
      <Container maxWidth="md">
        <Typography variant="h4">{vehicle.regNo}</Typography>
        <Typography variant="h5">{vehicle.manufac}</Typography>

        {vehicle.imageCount > 0 && (
          <CardMedia
            sx={{
              height: "400px",
            }}
            image={`${config.imageUrlPrefix}v-${vehicle.id}-0.jpg?${vehicle.updatedAt}`}
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
              Fuel: {getFuelTypeLabel(vehicle.fuel)}
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

        <RecordsListContainer />
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
