import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { logout } from "../../state/thunks";
import { TopBar } from "./topbar";

export const TopBarContainer = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.app.user);
  const dispatch = useAppDispatch();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSearch = async (key: string) => {
    navigate(`/vehicle/list?key=${key}`);
  };

  if (!user) {
    return <></>;
  }

  return (
    <TopBar
      onMenuClick={handleNavigate}
      onSearch={handleSearch}
      onLogout={handleLogout}
    />
  );
};
