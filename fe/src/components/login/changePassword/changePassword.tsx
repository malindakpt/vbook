import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, useState } from "react";
import { Validators } from "../../../util/validators";

interface Props {
  loading: boolean;
  identifier: string;
  onChangePassword: (args: {
    identifier: string;
    resetCode: string;
    password: string;
  }) => void;
}
export const ChangePassword: FC<Props> = ({ loading, onChangePassword, identifier}) => {
  const [state, setState] = useState({
    identifier,
    resetCode: "",
    password: "",
  });

  const handleStateChange = (prop: string, value: string | number) => {
    setState((prev) => ({ ...prev, [prop]: value }));
  };

  const handleSignIn = () => {
    onChangePassword(state);
  };

  return (
    <>
      <Typography component="h1" variant="h3">
        Change Password
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
          disabled
        />

        <TextField
          value={state.resetCode}
          onChange={(e) => handleStateChange("resetCode", e.target.value)}
          margin="normal"
          required
          fullWidth
          label="Rest Code"
          autoFocus
          error={!Validators.text(state.resetCode)}
        />

        <TextField
          value={state.password}
          onChange={(e) => handleStateChange("password", e.target.value)}
          margin="normal"
          required
          fullWidth
          label="Enter New Password"
          type="password"
          autoComplete="off"
          error={!Validators.password(state.password)}
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
          Change Password
        </Button>
      </Box>
    </>
  );
};
