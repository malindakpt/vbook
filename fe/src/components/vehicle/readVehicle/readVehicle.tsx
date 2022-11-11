import { Container, Grid } from "@mui/material";
import { FC } from "react";
import { Vehicle } from "../../../types/Vehicle";

interface Props {
  vehicle: Vehicle;
  loading: boolean;
}
export const ReadVehicle: FC<Props> = ({ loading, vehicle }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (vehicle) {
    return (
      <Container maxWidth="lg">
        <Grid container spacing={2} rowSpacing={4}>
          <Grid xs={12} sm={8} md={6} item>
            <div>{vehicle.regNo}</div>
            <div>{vehicle.owner}</div>
            <div>{vehicle.fuel}</div>
            <div>{vehicle.type}</div>
          </Grid>
        </Grid>
      </Container>
    );
  }
  return <div>Vehicle Not found</div>
};
