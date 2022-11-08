import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { sendResetCode } from "../../../state/thunks";
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
  return <ForgotPassword loading={loading} onSendCode={handleSendCode}/>;
};
