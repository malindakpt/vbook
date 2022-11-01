import { useEffect, useState } from "react";
// import {
  
//   useLazySignInQuery,
//   useResetPasswordMutation,
//   useSignUpMutation,
// } from "../../state/api/user.api";
import { SignIn } from "./signIn";
// import { useNavigate } from "react-router-dom";
// import { create } from "domain";
import { User } from "../../types/User";
import { useDispatch } from "react-redux";
import { signIn, signUp } from "../../state/api/userSlice";
import { useAppDispatch } from "../../state/store";

export const enum Mode {
  "SIGN_IN",
  "SIGN_UP",
  "RESET",
}

export const SignInContainer = () => {
  // let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [mode, setMode] = useState(Mode.SIGN_IN);
  // const [createUser, {isSuccess: isSuccessSignUp}] = useSignUpMutation();
  // const [resetUser, {isSuccess: isSuccessSignIn}] = useResetPasswordMutation();
  // const [getUser, { data, isLoading }, lastPromiseInfo] = useLazySignInQuery(
  //   {}
  // );

  // useEffect(() => {
  //   if (isSuccessSignIn || isSuccessSignUp || data) {
  //     navigate("/");
  //   }
  // }, [isSuccessSignIn, isSuccessSignUp, data, navigate]);

  const handleModeChange = (mode: Mode) => {
    setMode(mode);
  };

  const handleCreateUser = (user: User) => {
    // createUser(user);
    dispatch(signUp(user));
  };

  const handleSignIn = (identifier: string, password: string) => {
    dispatch(signIn({identifier, password}));
    // getUser({ identifier, password });
  };

  const handleReset = (identifier: string) => {
    // resetUser(identifier);
  };

  return (
    <SignIn
      onModeChange={handleModeChange}
      onCreateUser={handleCreateUser}
      onSignIn={handleSignIn}
      onReset={handleReset}
      mode={mode}
    />
  );
};
