import { FC } from "react";
import { changePassword } from "../../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { ChangePassword } from "./changePassword";
interface Props {
    // loading: boolean;
  // onModeChange: (mode: LoginUIMode) => void;
}
export const ChangePasswordContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.login.changePassword.loading);

  const handleChangePassword = (args: {
    identifier: string,
    resetCode: string,
    password: string
  }) => {
    dispatch(changePassword(args));
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

  return <ChangePassword loading={loading} onChangePassword={handleChangePassword}/>;
};
