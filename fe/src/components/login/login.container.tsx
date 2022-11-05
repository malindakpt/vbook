import { Login } from "./login";
// import { useAppDispatch, useAppSelector } from "../../state/store";

export const LoginContainer = () => {
  // const dispatch = useAppDispatch();
  // const isResetCodeSent = useAppSelector((state) => state.app.login.signUp);
  // const [mode, setMode] = useState(LoginUIMode.SIGN_UP);
  
  // const handleModeChange = (mode: LoginUIMode) => {
  //   setMode(mode);
  // };

  // const handleCreateUser = (user: User) => {
  //   dispatch(signUp(user));
  // };

  // const handleSignIn = (identifier: string, password: string) => {
  //   dispatch(signIn({identifier, password}));
  // };

  // const handleSendResetCode = (identifier: string) => {
  //   dispatch(sendResetCode({identifier}));
  // };

  // const handleResetPassword = (resetCode: string, identifier: string, password: string) => {
  //   dispatch(changePassword({resetCode, identifier, password}));
  // };

  return (
    <Login
      // onModeChange={handleModeChange}
      // onCreateUser={handleCreateUser}
      // onSignIn={handleSignIn}
      // onSendResetCode={handleSendResetCode}
      // onValidateResetCode={handleResetPassword}
      // mode={mode}
    />
  );
};
