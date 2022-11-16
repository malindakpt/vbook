import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FC } from "react";
import { Copyright } from "./copyright";
import { SignUpContainer } from "./signUp/signUp.container";
import { LoginUIMode } from "../../enum/login.ui.mode";
import { colors, Grid, Link } from "@mui/material";
import { SignInContainer } from "./signIn/signIn.container";
import { ForgotPasswordContainer } from "./forgotPassword/forgotPassword.container";
import { ChangePasswordContainer } from "./changePassword/changePassword.container";

const theme = createTheme({
  palette:{
    primary: {
      main: colors.deepPurple[500],
    }
  }
});

interface Props {
  mode: LoginUIMode;
  onModeChange: (mode: LoginUIMode) => void;
}
export const Login: FC<Props> = ({ onModeChange, mode }) => {
  const handleModeChange = (mode: LoginUIMode) => {
    onModeChange(mode);
  };

  const renderContent = (mode: LoginUIMode) => {
    switch (mode) {
      case LoginUIMode.SIGN_IN:
        return <SignInContainer />;
      case LoginUIMode.SIGN_UP:
        return <SignUpContainer />;
      case LoginUIMode.FORGOT_PASSWORD:
        return <ForgotPasswordContainer />;
      case LoginUIMode.CHANGE_PASSWORD:
        return <ChangePasswordContainer />;
      default:
        return <></>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container>
        <Grid item xs={12} sm={5}>
          <Box 
            sx={{
              margin: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {renderContent(mode)}

            <Grid>
              <Grid item xs>
                <Link
                  href="#"
                  variant="body2"
                  onClick={() => handleModeChange(LoginUIMode.FORGOT_PASSWORD)}
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {mode === LoginUIMode.SIGN_IN ? (
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => handleModeChange(LoginUIMode.SIGN_UP)}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                ) : (
                  <Link
                    href="#"
                    variant="body2"
                    onClick={() => handleModeChange(LoginUIMode.SIGN_IN)}
                  >
                    {"Already have an account? Sign In"}
                  </Link>
                )}
              </Grid>
            </Grid>
            <Copyright />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
