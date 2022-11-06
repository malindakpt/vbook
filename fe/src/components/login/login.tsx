import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, useState } from "react";
import { Copyright } from "./copyright";
import { ResetValidateCode } from "./resetValidateCode/resetValidateCode";
import { SignUpContainer } from "./signUp/signUp.container";
import { LoginUIMode } from "../../enum/login.ui.mode";
import { Grid, Link } from "@mui/material";
import { SignInContainer } from "./signIn/signIn.container";
import { ForgotPasswordContainer } from "./forgotPassword/forgotPassword.container";

const theme = createTheme();

interface Props {
  // mode: Mode;
  // isResetCodeSent: boolean;
  // onModeChange: (mode: LoginUIMode) => void;
  // onSignUp: (user: User) => void;
  // onSignIn: (identifier: string, password: string) => void;
  // onSendResetCode: (identifier: string) => void;
  // onValidateResetCode: (
  //   resetCode: string,
  //   identifier: string,
  //   password: string
  // ) => void;
}

export const Login: FC<Props> = ({}) => {

  const [mode, setMode] = useState(LoginUIMode.SIGN_IN);

  const renderContent = (mode: LoginUIMode) => {
    switch (mode) {
      case LoginUIMode.SIGN_IN:
        return <SignInContainer  />;
      case LoginUIMode.SIGN_UP:
        return <SignUpContainer/>;
      case LoginUIMode.RESET_SEND:
        return <ForgotPasswordContainer />;
      case LoginUIMode.RESET_VALIDATE:
        return <ResetValidateCode />;
      default:
        return <></>;
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
          {renderContent(mode)}
        </Box>
        <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" onClick={() => setMode(LoginUIMode.RESET_SEND)}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              { mode === LoginUIMode.SIGN_IN ? <Link href="#" variant="body2" onClick={() => setMode(LoginUIMode.SIGN_UP)}>
                {"Don't have an account? Sign Up"}
              </Link> :
              <Link href="#" variant="body2" onClick={() => setMode(LoginUIMode.SIGN_IN)}>
                {"Already have an account? Sign In"}
              </Link>}
            </Grid>
          </Grid>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};
