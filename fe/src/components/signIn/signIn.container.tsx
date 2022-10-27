import { useEffect, useState } from "react";
import { User } from "../../../../be/src/models/user/user";
import { useLazyGetUserQuery, useResetPasswordMutation, useSignUpMutation } from "../../state/api/user.api";
import { SignIn } from "./signIn";
import { useNavigate } from "react-router-dom";
import { create } from "domain";

export const enum Mode {
  "SIGN_IN",
  "SIGN_UP",
  "RESET",
}

export const SignInContainer = () => {

  let navigate = useNavigate();

  const [mode, setMode] = useState(Mode.SIGN_IN);
  const [createUser, createResult] = useSignUpMutation();
  const [resetUser, resetResult] = useResetPasswordMutation();
  const [getUser, { data, isLoading }, lastPromiseInfo] = useLazyGetUserQuery({});

  useEffect(() => {
    console.log(createResult);
    if(createResult.isSuccess ){
    navigate('/home/');
    }
  }, [createResult.isSuccess])


  const handleModeChange = (mode: Mode) => {
    setMode(mode);
  };

  const handleCreateUser = (user: User) => {
    createUser(user);
  };

  const handleSignIn = (identifier: string, password: string) => {
    getUser({ identifier, password});
  }

  const handleReset = (identifier: string) => {
    resetUser(identifier)
  }

  return (
    <SignIn
      onModeChange={handleModeChange}
      onCreateUser={handleCreateUser}
      onSignIn={handleSignIn}
      onReset={handleReset}
      // onAuthSuccess={handleAuthSuccess}
      mode={mode}
    />
  );
};
