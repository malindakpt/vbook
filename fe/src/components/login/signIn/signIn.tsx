import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { Validators } from "../../../util/validators";
import { LoginUIMode } from "../../../enum/login.ui.mode";

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
    console.log(prop, value);
    setState((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSignIn = () => {
    onSignIn(state);
  };

  return (
    <>
      <Typography component="h1" variant="h3">
        Sign In
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>

        <TextField
          value={state.identifier}
          onChange={(e) => handleStateChange("identifier", e.target.value)}
          margin="normal"
          required
          fullWidth
          id="identifier"
          label="Email Address/ Phone Number"
          name="identifier"
          autoComplete="email"
          autoFocus
          error={!Validators.text(state.identifier)}
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
        /> 

        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={`success`}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignIn}
          disabled={loading}
        >
          Sign In
        </Button>
      </Box>
    </>
  );
};
