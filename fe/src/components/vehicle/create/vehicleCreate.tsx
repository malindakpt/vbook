import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { FC, useState } from "react";
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
} from "../../../util/selectOptions";
import { ImageInput } from "../../inputs/ImageInput";
import { config } from "../../../config";

interface Props {
  userId: number;
  loading: boolean;
  isSimpleMode?: boolean;
  initialState?: Partial<Vehicle>;
  onSave: (v: Vehicle, image: Blob | undefined) => void;
}
export const VehicleCreate: FC<Props> = ({
  loading,
  userId,
  initialState,
  isSimpleMode,
  onSave,
}) => {
  const [image, setImage] = useState<Blob>();

  const onImageChange = (img: Blob) => {
    setImage(img);
    changeProperty("imageCount", img ? 1 : 0);
  };

  const [vehicleState, changeProperty] = useFormState<Vehicle>({
    chassis: "",
    transmission: 0,
    model: "",
    regNo: "",
    fuel: 0,
    brand: 0,
    type: 0,
    manufac: new Date().getFullYear(),
    UserId: userId,
    imageCount: 0,

    ...initialState,
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={12} sm={8} md={6} item>
          <TextInput
            value={vehicleState.regNo}
            name="regNo"
            label="Registration No"
            disabled={loading}
            onChange={changeProperty}
          />

          {!isSimpleMode && (
            <AutoInputImage
              name="type"
              label="Vehicle Type"
              options={vehicleTypes}
              disabled={loading}
              onChange={changeProperty}
              value={vehicleState.type}
            />
          )}

          {!isSimpleMode && (
            <AutoInput
              value={vehicleState.brand}
              name="brand"
              label="Brand Name"
              options={vehicleBrands}
              disabled={loading}
              onChange={changeProperty}
            />
          )}

          {!isSimpleMode && (
            <TextInput
              value={vehicleState.model}
              name="model"
              label="Model"
              disabled={loading}
              onChange={changeProperty}
            />
          )}

          {!isSimpleMode && (
            <NumberInput
              value={vehicleState.manufac}
              name="manufactureYear"
              label="Year of Manufacture"
              disabled={loading}
              onChange={changeProperty}
            />
          )}

          {!isSimpleMode && (
            <AutoInput
              value={vehicleState.fuel}
              name="fuel"
              label="Fuel Type"
              options={fuelTypes}
              disabled={loading}
              onChange={changeProperty}
            />
          )}

          {!isSimpleMode && (
            <AutoInput
              value={vehicleState.transmission}
              name="transmission"
              label="Transmission"
              options={transmissionTypes}
              disabled={loading}
              onChange={changeProperty}
            />
          )}

          <TextInput
            value={vehicleState.chassis}
            name="chassis"
            label="Chassis Number"
            disabled={loading}
            onChange={changeProperty}
          />

          <ImageInput
            defaultImageUrl={
              vehicleState.imageCount > 0
                ? `${config.imageUrlPrefix}v-${vehicleState.id}-0.jpg`
                : null
            }
            onImageSelected={onImageChange}
          />

          <Button onClick={() => onSave(vehicleState, image)}>
            {isSimpleMode ? `Add Photo` : `Save Vehicle`}
          </Button>
        </Grid>
        <Grid xs={6} md={4} item></Grid>
      </Grid>
    </Container>
  );
};
