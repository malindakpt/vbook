import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Vehicle } from "../../../types/Vehicle";
import { VehicleView } from "../view/vehicleView";

interface Props {
  loading: boolean;
  vehicles: Vehicle[];
  onSelect: (vehicle: Vehicle) => void;
}
export const ListVehicles: FC<Props> = ({ vehicles, onSelect, loading }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!vehicles) {
    return <div>No vehicles</div>;
  }

  if (vehicles) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            {vehicles.map((vehicle) => <VehicleView key={vehicle.id} v={vehicle} />)}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
