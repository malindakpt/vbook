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
  onSignUp: (user: {
    name: string;
    identifier: string;
    country: string;
    password: string;
  }) => void;
}
export const SignUp: FC<Props> = ({ loading, onSignUp }) => {
  const [state, setState] = useState({
    name: "",
    identifier: "",
    password: "",
    country: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  const handleStateChange = (prop: string, value: string | number) => {
    console.log(prop, value);
    setState((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSignUp = () => {
    onSignUp(state);
  };

  return (
    <>
      <Typography component="h1" variant="h3">
        Create Account
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          value={state.name}
          onChange={(e) => handleStateChange("name", e.target.value)}
          margin="normal"
          required
          fullWidth
          label="Enter Your Name"
          autoComplete="name"
          autoFocus
          error={!Validators.text(state.name)}
        />

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
          onClick={handleSignUp}
          disabled={loading}
        >
          Sign Up
        </Button>
      </Box>
    </>
  );
};
