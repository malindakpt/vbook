import { FC } from "react";import { useAppDispatch, useAppSelector } from "../../../state/store";
import { changePassword } from "../../../state/thunks";
import { ChangePassword } from "./changePassword";
interface Props {
    // loading: boolean;
  // onModeChange: (mode: LoginUIMode) => void;
}
export const ChangePasswordContainer: FC<Props> = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.app.login.changePassword.loading);
  const identifier = useAppSelector((state) => state.app.login.changePassword.identifier);

  const handleChangePassword = (args: {
    identifier: string,
    resetCode: string,
    password: string
  }) => {
    dispatch(changePassword(args));
  };

  return <ChangePassword identifier={identifier} loading={loading} onChangePassword={handleChangePassword}/>;
};
