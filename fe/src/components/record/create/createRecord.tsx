import { Button, Container, Grid} from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import {
  TextInput,
  NumberInput,
  AutoInput,
  AutoInputImage,
} from "../../inputs";

import { Record } from "../../../types/Record";
import { SelectOption } from "../../../types/SelectOption";

interface Props {
  userId: number;
  vehicleId?: number;
  loading: boolean;
  initialState?: Record;
  vehicleList: SelectOption[];
  onSaveRecord: (r: Record) => void;
}
export const CreateRecord: FC<Props> = ({
  loading,
  vehicleId,
  userId,
  initialState,
  vehicleList,
  onSaveRecord,
}) => {

  const [state, changeProperty] = useFormState<Record>(initialState ?? {
    date: new Date().getTime(),
    type: 0,
    millage: 0,
    desc: '',
    VehicleId: 22, // vehicleId ?? 0,
    UserId: userId,
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={12} sm={8} md={6} item>
        <AutoInput
            value={state.VehicleId ?? 0}
            name="brand"
            label="Select Vehicle"
            options={vehicleList}
            disabled={loading}
            onChange={changeProperty}
          />
          {/* <SelectVehiclesContainer onSelect={changeProperty} /> */}
          {/* <DateInput
            value={state.date}
            name="regNo"
            label="Date"
            disabled={loading}
            onChange={changeProperty}
          /> */}
          <Button onClick={() => onSaveRecord(state)}>Save Record</Button>
        </Grid>
        <Grid xs={6} md={4} item> 
        </Grid>
      </Grid>
    </Container>
  );
};
