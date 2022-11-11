import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Vehicle } from "../../../types/Vehicle";

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
            {vehicles.map((vehicle) => {
              return (
                <div key={vehicle.id} onClick={() => onSelect(vehicle)}>
                  <div>{vehicle.regNo}</div>
                  <div>{vehicle.owner}</div>
                  <div>{vehicle.fuel}</div>
                  <div>{vehicle.type}</div>
                </div>
              );
            })}
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>;
};
