import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { signIn } from "../../../state/thunks";
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

  return <SignIn loading={loading} onSignIn={handleSignIn}/>;
};
