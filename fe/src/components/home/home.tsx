import { getAllUsers, logout, refreshToken } from "../../state/api/userSlice";
import { useAppDispatch } from "../../state/store";

export const Home = () => {
  // const dispatch = useDispatch();
  const dispatch = useAppDispatch();

  const click = () => {
    dispatch(getAllUsers());
  };

  const handleRefreshToken = () => {
    dispatch(refreshToken());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
        <h1>Home Component</h1>
      <button onClick={click}>Get All Users</button>
      <button onClick={handleRefreshToken}>Refresh</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};
