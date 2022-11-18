import { Button, Container, Grid } from "@mui/material";
import { FC } from "react";
import { config } from "../../../config";
import { Vehicle } from "../../../types/Vehicle";

interface Props {
  vehicle: Vehicle;
  loading: boolean;
  onEdit: (vehicle: Vehicle) => void;
  onDelete: (vehicle: Vehicle) => void;
  onAddRecord: (vehicle: Vehicle) => void;
  onViewRecord: (vehicle: Vehicle) => void;
}
export const ReadVehicle: FC<Props> = ({ loading, vehicle, onEdit, onDelete, onAddRecord, onViewRecord }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (vehicle) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            <div>{vehicle.regNo}</div>
            <div>{vehicle.fuel}</div>
            <div>{vehicle.type}</div>
            <img alt="img" src={`${config.imageUrlPrefix}v-${vehicle.id}-0.jpg`} />
            <Button onClick={() => onEdit(vehicle)}>Edit</Button>
            <Button onClick={() => onDelete(vehicle)}>Delete</Button>
            <Button onClick={() => onAddRecord(vehicle)}>Add Record</Button>
            <Button onClick={() => onViewRecord(vehicle)}>View Records</Button>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>
};
