import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { Validators } from "../../../util/validators";

interface Props {
  loading: boolean;
  onSendCode: (args: { identifier: string }) => void;
}
export const ForgotPassword: FC<Props> = ({ loading, onSendCode }) => {
  const [state, setState] = useState({
    identifier: "",
  });

  const handleStateChange = (prop: string, value: string | number) => {
    setState((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSignIn = () => {
    onSendCode(state);
  };

  return (
    <>
      <Typography component="h1" variant="h3">
        Forgot Password
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color={`success`}
          sx={{ mt: 3, mb: 2 }}
          onClick={handleSignIn}
          disabled={loading}
        >
          Send Reset Code
        </Button>
      </Box>
    </>
  );
};
