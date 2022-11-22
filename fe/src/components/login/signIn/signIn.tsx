import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC } from "react";
import { Validators } from "../../../util/validators";
import { TextInput } from "../../shared";
import { useFormState } from "../../../hooks/useFormState";
import { CustomButton } from "../../shared/CustomButton";

interface Props {
  loading: boolean;
  onSignIn: (args: { identifier: string; password: string }) => void;
}
export const SignIn: FC<Props> = ({ loading, onSignIn }) => {

  const [state, changeProperty] = useFormState({
    identifier: "",
    password: "",
  });

  const handleSignIn = () => {
    onSignIn(state);
  };

  const isReadyToSubmit = () => {
    if (Validators.text(state.identifier) && Validators.text(state.password)) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Typography component="h1" variant="h4" color="primary">
        Sign In
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>

        <TextInput
          value={state.identifier}
          name="identifier"
          label="Email Address/ Phone Number"
          onChange={changeProperty}
          disabled={loading}
        />

        <TextInput
          value={state.password}
          name="password"
          label="Password"
          onChange={changeProperty}
          disabled={loading}
        />

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <CustomButton
          label="Sign In"
          onClick={handleSignIn}
          disabled={loading || !isReadyToSubmit()}
        />
      </Box>
    </>
  );
};
