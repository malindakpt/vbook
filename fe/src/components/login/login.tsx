import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC, useState } from "react";
import { Copyright } from "./copyright";
import { SignIn } from "./signIn/signIn";
import { ResetSendCode } from "./resetSendCode/resetSendCode";
import { ResetValidateCode } from "./resetValidateCode/resetValidateCode";
import { SignUpContainer } from "./signUp/signUp.container";
import { LoginUIMode } from "../../enum/login.ui.mode";

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

  const [mode, setMode] = useState(LoginUIMode.SIGN_UP);

  const handleModeChange = (mode: LoginUIMode) => {
    setMode(mode);
  }

   const renderContent = (mode: LoginUIMode) => {
    switch (mode) {
      case LoginUIMode.SIGN_IN:
        return <SignIn  />;
      case LoginUIMode.SIGN_UP:
        return <SignUpContainer onModeChange={handleModeChange} />;
      case LoginUIMode.RESET_SEND:
        return <ResetSendCode />;
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
        <Copyright />
      </Container>
    </ThemeProvider>
  );
};
