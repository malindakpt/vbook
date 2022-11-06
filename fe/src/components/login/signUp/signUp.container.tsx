import { FC } from "react";
import { signUp } from "../../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { User } from "../../../types/User";
import { SignUp } from "./signUp";

export const SignUpContainer: FC = () => {
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

  return <SignUp loading={loading} onSignUp={handleSignUp} />;
};
