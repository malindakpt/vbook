import { Button, Container, Grid, Paper, styled } from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import {
  TextInput,
  NumberInput,
  AutoInput,
  AutoInputImage,
} from "../../inputs";

import { Record } from "../../../types/Record";
import { DateInput } from "../../inputs/DateInput";

interface Props {
  userId: number;
  vehicleId: number;
  loading: boolean;
  initialState?: Record;
  onCreateRecord: (r: Record) => void;
}
export const CreateRecord: FC<Props> = ({
  loading,
  vehicleId,
  userId,
  initialState,
  onCreateRecord,
}) => {

  const [state, changeProperty] = useFormState<Record>(initialState ?? {
    date: new Date().getTime(),
    type: 0,
    millage: 0,
    desc: '',
    VehicleId: vehicleId,
    UserId: userId,
  });
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={12} sm={8} md={6} item>
          <DateInput
            value={state.date}
            name="regNo"
            label="Date"
            disabled={loading}
            onChange={changeProperty}
          />
 

          <Button onClick={() => onCreateRecord(state)}>Save Record</Button>
        </Grid>
        <Grid xs={6} md={4} item> 
        </Grid>
      </Grid>
    </Container>
  );
};
