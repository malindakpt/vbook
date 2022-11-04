import { useState } from "react";
import { SignIn } from "./signIn";
import { User } from "../../types/User";
import { changePassword, sendResetCode, signIn, signUp } from "../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../state/store";

export const enum Mode {
  "SIGN_IN",
  "SIGN_UP",
  "RESET",
}

export const SignInContainer = () => {
  const dispatch = useAppDispatch();
  const isResetCodeSent = useAppSelector((state) => state.app.isResetCodeSent);
  const [mode, setMode] = useState(Mode.SIGN_IN);
  
  const handleModeChange = (mode: Mode) => {
    setMode(mode);
  };

  const handleCreateUser = (user: User) => {
    dispatch(signUp(user));
  };

  const handleSignIn = (identifier: string, password: string) => {
    dispatch(signIn({identifier, password}));
  };

  const handleSendResetCode = (identifier: string) => {
    dispatch(sendResetCode({identifier}));
  };

  const handleResetPassword = (resetCode: string, identifier: string, password: string) => {
    dispatch(changePassword({resetCode, identifier, password}));
  };

  return (
    <SignIn
      onModeChange={handleModeChange}
      onCreateUser={handleCreateUser}
      onSignIn={handleSignIn}
      onSendResetCode={handleSendResetCode}
      onValidateResetCode={handleResetPassword}
      mode={mode}
      isResetCodeSent={isResetCodeSent}
    />
  );
};
