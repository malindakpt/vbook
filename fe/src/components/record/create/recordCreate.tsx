import { Button, Container, Grid } from "@mui/material";
import { FC, useState } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { TextInput, NumberInput, AutoInput } from "../../inputs";

import { Record } from "../../../types/Record";
import { SelectOption } from "../../../types/SelectOption";
import { serviceTypes } from "../../../util/selectOptions";
import { ImageInput } from "../../inputs/ImageInput";
import { DateInput } from "../../inputs/DateInput";
import { getFormattedDate } from "../../../util/helper";
import { config } from "../../../config";

interface Props {
  userId: number;
  loading: boolean;
  initialState?: Partial<Record>;
  vehicleList: SelectOption[];
  onSaveRecord: (r: Record, image: Blob | undefined) => void;
}
export const CreateRecord: FC<Props> = ({
  loading,
  userId,
  initialState,
  vehicleList,
  onSaveRecord,
}) => {

  const [image, setImage] = useState<Blob>();

  const onImageChange = (img: Blob) => {
    setImage(img);
    changeProperty('imageCount', img ? 1 : 0);
  }

  const [state, changeProperty] = useFormState<Record>({
    date: getFormattedDate(new Date()),
    type: 0,
    millage: 0,
    desc: "",
    VehicleId: 0, // vehicleId ?? 0,
    UserId: userId,
    imageCount: 0,

    ...initialState,
  });


  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={12} sm={8} md={6} item>
          <AutoInput
            value={state.VehicleId ?? 0}
            name="VehicleId"
            label="Select Vehicle"
            options={vehicleList}
            disabled={loading}
            onChange={changeProperty}
          />

          <AutoInput
            value={state.type}
            name="type"
            label="Service Type"
            options={serviceTypes}
            disabled={loading}
            onChange={changeProperty}
          />

          <NumberInput
            value={state.millage}
            name="millage"
            label="Millage"
            disabled={loading}
            onChange={changeProperty}
          />

          <TextInput
            value={state.desc}
            name="desc"
            label="Decription"
            disabled={loading}
            multiline
            onChange={changeProperty}
          />

          <DateInput
            value={state.date}
            name="date"
            label="Date"
            disabled={loading}
            onChange={changeProperty}
          />

          <ImageInput defaultImageUrl={state.imageCount > 0 ? `${config.imageUrlPrefix}${state.id}-0.jpg` : null} onImageSelected={onImageChange} />
          <Button onClick={() => onSaveRecord(state, image)}>Save Record</Button>
        </Grid>
        <Grid xs={6} md={4} item></Grid>
      </Grid>
    </Container>
  );
};
