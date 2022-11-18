import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Vehicle } from "../../../types/Vehicle";
import { VehicleGridView } from "./vehicleGridView";

interface Props {
  loading: boolean;
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}
export const VehiclesList: FC<Props> = ({ vehicles, onSelect, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vehicles) {
    return <div>No vehicles</div>;
  }

  if (vehicles) {
    return (
      <Container maxWidth="lg">
        <Grid container>
          {vehicles.map((vehicle) => (
            <Grid xs={12} md={6} item key={vehicle.id}>
              <VehicleGridView onSelect={onSelect} v={vehicle} />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
