import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { Validators } from "../../../util/validators";

interface Props {
  loading: boolean;
  onSignIn: (args: {
    identifier: string;
    password: string;
  }) => void;
}
export const SignIn: FC<Props> = ({ loading, onSignIn }) => {
  const [state, setState] = useState({
    identifier: "",
    password: "",
  });

  const handleStateChange = (prop: string, value: string | number) => {
    setState((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSignIn = () => {
    onSignIn(state);
  };

  const isReadyToSubmit = () => {
    if(Validators.text(state.identifier) && Validators.text(state.password) ){
      return true;
    }
    return false;
  }

  return (
    <>
      <Typography component="h1" variant="h3" color="primary">
        Sign In
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>

        <TextField
          value={state.identifier}
          onChange={(e) => handleStateChange("identifier", e.target.value)}
          margin="normal"
          required
          fullWidth
          label="Email Address/ Phone Number"
          autoFocus
          error={!Validators.text(state.identifier)}
          disabled={loading}
        />

        <TextField
          value={state.password}
          onChange={(e) => handleStateChange("password", e.target.value)}
          margin="normal"
          required
          fullWidth
          label="Enter Password"
          type="password"
          autoComplete="off"
          error={!Validators.password(state.password)}
          disabled={loading}
        /> 

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignIn}
          disabled={loading || !isReadyToSubmit()}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};
