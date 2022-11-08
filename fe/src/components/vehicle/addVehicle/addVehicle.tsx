import { Container, Grid, Paper, styled } from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { TextInput, NumberInput, AutoInput } from "../../inputs";

const vehicleBrands = [
  { label: "-Select a brand-", id: 0 },
  { label: "TOYOTA", id: 1 },
  { label: "NISAAN", id: 2 },
  { label: "MITSUBISHI", id: 3 },
  { label: "ISUZU", id: 4 },
  { label: "MAZDA", id: 5 },
  { label: "SUBARU", id: 6 },
];

const fuelTypes = [
  { label: "-Select fuel type-", id: 0 },
  { label: "PETROL", id: 1 },
  { label: "DISEL", id: 2 },
  { label: "HYBRID", id: 3 },
  { label: "ELECTRIC", id: 4 },
];
interface Props {
  owner: string;
  loading: boolean;
}
export const AddVehicle: FC<Props> = ({ loading, owner }) => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [state, changeProperty] = useFormState({
    regNo: "",
    fuel: 0,
    owner,
    brand: 0,
    manufactureYear: new Date().getFullYear(),
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

          <AutoInput
            name="brand"
            label="Brand Name"
            options={vehicleBrands}
            disabled={loading}
            onChange={changeProperty}
            value={state.brand}
          />

          <NumberInput
            value={state.manufactureYear}
            name="manufactureYear"
            label="Year of Manufacture"
            disabled={loading}
            onChange={changeProperty}
          />

          <AutoInput
            name="fuel"
            label="Fuel Type"
            options={fuelTypes}
            disabled={loading}
            onChange={changeProperty}
            value={state.fuel}
          />
        </Grid>
        <Grid xs={6} md={4} item>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Container>
  );
};
