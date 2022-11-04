import { useState } from "react";
import { SignIn } from "./signIn";
import { User } from "../../types/User";
import { resetPassword, signIn, signUp } from "../../state/api/userSlice";
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

  const handleReset = (identifier: string) => {
    dispatch(resetPassword({identifier}));
  };

  return (
    <SignIn
      onModeChange={handleModeChange}
      onCreateUser={handleCreateUser}
      onSignIn={handleSignIn}
      onReset={handleReset}
      mode={mode}
      isResetCodeSent={isResetCodeSent}
    />
  );
};
