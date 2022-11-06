import { LoginUIMode } from "../../enum/login.ui.mode";
import { changeLoginMode } from "../../state/api/userSlice";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { Login } from "./login";

export const LoginContainer = () => {
  const dispatch = useAppDispatch();
  const loginUIMode = useAppSelector((state) => state.app.login.mode);
  
  const handleModeChange = (mode: LoginUIMode) => {
    dispatch(changeLoginMode(mode))
  };
  return (
    <Login
      onModeChange={handleModeChange}
      mode={loginUIMode}
    />
  );
};
