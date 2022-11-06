import { FC } from "react";
import { sendResetCode } from "../../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { ForgotPassword } from "./forgotPassword";
interface Props {
  // onModeChange: (mode: LoginUIMode) => void;
}
export const ForgotPasswordContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.login.forgotPassword.loading);

  const handleSendCode = (args: {
    identifier: string
  }) => {
    dispatch(sendResetCode(args));
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

  return <ForgotPassword loading={loading} onSendCode={handleSendCode}/>;
};
