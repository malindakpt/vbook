import {
  Button,
  Container,
  Grid,
  Typography,
  CardMedia,
  ButtonGroup,
  Box,
  IconButton,
} from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import EditIcon from '@mui/icons-material/Edit';
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
        <Grid container marginTop={2} justifyContent="right">
          <Grid item xs={6}>
            <Typography variant="h4">
              {vehicle.regNo}{" "}
              <IconButton aria-label="delete" size="large">
                <EditIcon fontSize="inherit" />
              </IconButton>
            </Typography>

            <Typography variant="h5">{vehicle.manufac}</Typography>
          </Grid>
          <Grid item xs={6}>
            <ButtonGroup variant="text" aria-label="text button group">
              {/* <Button onClick={() => onAddRecord(vehicle)}>Add Record</Button> */}
              <Button onClick={() => onEdit(vehicle)}>Edit Vehicle</Button>
            </ButtonGroup>
          </Grid>
        </Grid>

        {vehicle.imageCount > 0 && (
          <CardMedia
            sx={{
              height: "300px",
            }}
            image={`${config.imageUrlPrefix}v-${vehicle.id}-0.jpg?${vehicle.updatedAt}`}
          />
        )}

        <Grid container justifyContent="center">
          {/* <ButtonGroup variant="text" aria-label="text button group">
            <Button onClick={() => onAddRecord(vehicle)}>Add Record</Button>
            <Button onClick={() => onEdit(vehicle)}>Edit Vehicle</Button>
          </ButtonGroup> */}
        </Grid>

        <Grid container>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">
              <span color="seconday">Make: </span>{" "}
              {getVehicleBrandLabel(vehicle.brand)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">
              Type: {getVehicleTypeLabel(vehicle.type)}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">
              Fuel: {getFuelTypeLabel(vehicle.fuel)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Chassis No: {vehicle.chassis}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">Model: {vehicle.model}</Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <Typography variant="h6">
              Type: {getVehicleTypeLabel(vehicle.type)}
            </Typography>
          </Grid>
        </Grid>

        <RecordsListContainer />
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
