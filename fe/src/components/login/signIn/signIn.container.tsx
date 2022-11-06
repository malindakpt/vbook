import { FC } from "react";
import { signIn } from "../../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { SignIn } from "./signIn";
interface Props {
  // onModeChange: (mode: LoginUIMode) => void;
}
export const SignInContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.login.signIn.loading);

  const handleSignIn = (args: {
    identifier: string;
    password: string;
  }) => {
    dispatch(signIn(args));
  };

  // const handleSignIn = (identifier: string, password: string) => {
  //   dispatch(signIn({identifier, password}));
  // };

  // const handleSendResetCode = (identifier: string) => {
  //   dispatch(sendResetCode({identifier}));
  // };

  // const handleResetPassword = (resetCode: string, identifier: string, password: string) => {
  //   dispatch(changePassword({resetCode, identifier, password}));
  // };

  return <SignIn loading={loading} onSignIn={handleSignIn}/>;
};
