import { Button, Container, Grid } from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { TextInput, NumberInput, AutoInput } from "../../inputs";

import { Record } from "../../../types/Record";
import { SelectOption } from "../../../types/SelectOption";
import { serviceTypes } from "../../../util/selectOptions";

interface Props {
  userId: number;
  loading: boolean;
  initialState?: Partial<Record>;
  vehicleList: SelectOption[];
  onSaveRecord: (r: Record) => void;
}
export const CreateRecord: FC<Props> = ({
  loading,
  userId,
  initialState,
  vehicleList,
  onSaveRecord,
}) => {
  const [state, changeProperty] = useFormState<Record>({
    date: new Date().toISOString(),
    type: 0,
    millage: 0,
    desc: "",
    VehicleId: 0, // vehicleId ?? 0,
    UserId: userId,

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

          {/* <DateInput
            value={state.date}
            name="regNo"
            label="Date"
            disabled={loading}
            onChange={changeProperty}
          /> */}
          <Button onClick={() => onSaveRecord(state)}>Save Record</Button>
        </Grid>
        <Grid xs={6} md={4} item></Grid>
      </Grid>
    </Container>
  );
};
