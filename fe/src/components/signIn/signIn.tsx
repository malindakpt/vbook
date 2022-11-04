import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { Copyright } from "./copyright";
import { Mode } from "./signIn.container";
import { isEmail } from "../../util/helper";
import { User } from "../../types/User";

const theme = createTheme();

interface Props {
  mode: Mode;
  isResetCodeSent: boolean;
  onModeChange: (mode: Mode) => void;
  onCreateUser: (user: User) => void;
  onSignIn: (identifier: string, password: string) => void;
  onSendResetCode: (identifier: string) => void;
  onValidateResetCode: (identifier: string, password: string) => void;
}

export const SignIn: FC<Props> = ({
  mode,
  isResetCodeSent,
  onModeChange,
  onCreateUser,
  onSignIn,
  onSendResetCode,
  onValidateResetCode
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const identifier = data.get("identifier")?.toString();
    const name = data.get("name")?.toString();
    const password1 = data.get("password1")?.toString();
    const password2 = data.get("password2")?.toString();

    switch (mode) {
      case Mode.SIGN_IN:
        identifier && password1 && onSignIn(identifier, password1);
        break;

      case Mode.SIGN_UP:
        if (password1 !== password2) {
          alert("Mismatched Password");
          break;
        }
        if (identifier && name && password1) {
          const user = new User({
            country: Intl.DateTimeFormat().resolvedOptions().timeZone,
            email: isEmail(identifier) ? identifier : null,
            firstName: name,
            password: password1,
            phone: !isEmail(identifier) ? identifier : null,
          });
          onCreateUser(user);
          break;
        }
        break;

      case Mode.RESET:
        if (!identifier) {
          alert("Missing identifier");
          break;
        }
        if(isResetCodeSent){
          password1 && onValidateResetCode(identifier, password1);
        } else {
          onSendResetCode(identifier);
        }
        break;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            {mode === Mode.SIGN_IN
              ? `Sign in`
              : mode === Mode.SIGN_UP
              ? `Create Account`
              : `Reset Password`}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {mode === Mode.SIGN_UP && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Enter Your Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}

            {(mode === Mode.SIGN_IN ||
              mode === Mode.SIGN_UP ||
              (mode === Mode.RESET)) && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="identifier"
                label="Email Address/ Phone Number"
                name="identifier"
                autoComplete="email"
                autoFocus
                disabled={isResetCodeSent}
              />
            )}

            {mode === Mode.RESET && isResetCodeSent && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="resetCode"
                label="Enter reset code"
                name="resetCode"
                autoFocus
                autoComplete='off'
              />
            )}

            {(mode === Mode.SIGN_IN || mode === Mode.SIGN_UP || (mode === Mode.RESET && isResetCodeSent)) && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password1"
                label="Enter Password"
                type="password"
                id="password1"
                autoComplete='off'
              />
            )}

            {(mode === Mode.SIGN_UP || (mode === Mode.RESET && isResetCodeSent)) && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password2"
                label="Enter Password Again"
                type="password"
                id="password2"
                autoComplete="Enter Password Again"
              />
            )}
            {(mode === Mode.SIGN_UP || mode === Mode.SIGN_IN) && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color={
                mode === Mode.SIGN_IN
                  ? `primary`
                  : mode === Mode.SIGN_UP
                  ? `warning`
                  : mode === Mode.RESET && isResetCodeSent
                  ? `info`
                  : `success`
              }
              sx={{ mt: 3, mb: 2 }}
            >
              {mode === Mode.SIGN_IN
                ? `Sign In`
                : mode === Mode.SIGN_UP
                ? `Create Account`
                : mode === Mode.RESET && isResetCodeSent
                ? `Save new password`
                : `Send Reset Password Link`}
            </Button>
            <Grid container>
              <Grid item xs={6} alignItems="center">
                {mode !== Mode.RESET && (
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => onModeChange(Mode.RESET)}
                  >
                    Reset password?
                  </Link>
                )}
              </Grid>

              <Grid item xs={6}>
                <Link
                  href="#"
                  variant="body2"
                  align="center"
                  onClick={() =>
                    onModeChange(
                      mode === Mode.SIGN_IN ? Mode.SIGN_UP : Mode.SIGN_IN
                    )
                  }
                >
                  {mode === Mode.SIGN_IN ? "Create Account?" : "Sign In?"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};
