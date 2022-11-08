import {
  Container,
  Grid,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import { FC } from "react";
import { useFormState } from "../../../hooks/useFormState";
import { Validators } from "../../../util/validators";

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
    owner,
  });

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2} rowSpacing={4}>
        <Grid xs={6} md={8} item>
          <TextField
            value={state.regNo}
            onChange={(e) => changeProperty("regNo", e.target.value)}
            margin="normal"
            required
            fullWidth
            label="Enter Reg No."
            autoComplete="off"
            error={!Validators.regNo(state.regNo)}
            disabled={loading}
          />
        </Grid>
        <Grid xs={6} md={4} item>
          <Item>xs=6 md=4</Item>
        </Grid>
      </Grid>
    </Container>
  );
};
