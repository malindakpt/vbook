import { FC } from "react";
import { LoginUIMode } from "../../../enum/login.ui.mode";
import { signUp } from "../../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { User } from "../../../types/User";
import { SignUp } from "./signUp";

interface Props {
  onModeChange: (mode: LoginUIMode) => void;
}
export const SignUpContainer: FC<Props> = ({onModeChange}) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.login.signUp.loading);

  const handleSignUp = (data: {
    name: string;
    identifier: string;
    country: string;
    password: string;
  }) => {
    dispatch(signUp(new User(data)));
  };

  const handleModeChange = (mode: LoginUIMode) => {
    onModeChange(mode);
  }

  // const handleSignIn = (identifier: string, password: string) => {
  //   dispatch(signIn({identifier, password}));
  // };

  // const handleSendResetCode = (identifier: string) => {
  //   dispatch(sendResetCode({identifier}));
  // };

  // const handleResetPassword = (resetCode: string, identifier: string, password: string) => {
  //   dispatch(changePassword({resetCode, identifier, password}));
  // };

  return <SignUp loading={loading} onSignUp={handleSignUp} onModeChange={handleModeChange} />;
};
