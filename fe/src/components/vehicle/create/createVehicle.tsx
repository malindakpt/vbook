import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import {
  TextInput,
  NumberInput,
  AutoInput,
  AutoInputImage,
} from "../../inputs";

import { Vehicle } from "../../../types/Vehicle";
import {
  fuelTypes,
  transmissionTypes,
  vehicleBrands,
  vehicleTypes,
} from "./selectOptions";

interface Props {
  userId: number;
  loading: boolean;
  initialState?: Vehicle;
  onCreateVehicle: (v: Vehicle) => void;
}
export const CreateVehicle: FC<Props> = ({
  loading,
  userId,
  initialState,
  onCreateVehicle,
}) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [state, changeProperty] = useFormState<Vehicle>(initialState ?? {
    chassis: "",
    transmission: 0,
    model: "",
    regNo: "",
    fuel: 0,
    brand: 0,
    type: 0,
    manufac: new Date().getFullYear(),
    UserId: userId
  });
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={12} sm={8} md={6} item>
          <TextInput
            value={state.regNo}
            name="regNo"
            label="Registration No"
            disabled={loading}
            onChange={changeProperty}
          />

          <AutoInputImage
            name="type"
            label="Vehicle Type"
            options={vehicleTypes}
            disabled={loading}
            onChange={changeProperty}
            value={state.type}
          />

          <AutoInput
            value={state.brand}
            name="brand"
            label="Brand Name"
            options={vehicleBrands}
            disabled={loading}
            onChange={changeProperty}
          />

          <TextInput
            value={state.model}
            name="model"
            label="Model"
            disabled={loading}
            onChange={changeProperty}
          />

          <NumberInput
            value={state.manufac}
            name="manufactureYear"
            label="Year of Manufacture"
            disabled={loading}
            onChange={changeProperty}
          />

          <AutoInput
            value={state.fuel}
            name="fuel"
            label="Fuel Type"
            options={fuelTypes}
            disabled={loading}
            onChange={changeProperty}
          />

          <AutoInput
            value={state.transmission}
            name="transmission"
            label="Transmission"
            options={transmissionTypes}
            disabled={loading}
            onChange={changeProperty}
          />

          <TextInput
            value={state.chassis}
            name="chassis"
            label="Chassis Number"
            disabled={loading}
            onChange={changeProperty}
          />

          <Button onClick={() => onCreateVehicle(state)}>Create</Button>
        </Grid>
        <Grid xs={6} md={4} item>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Container>
  );
};
