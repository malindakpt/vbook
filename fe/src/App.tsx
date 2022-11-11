import { LoginContainer } from "./components/login/login.container";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "./state/store";
import { useEffect } from "react";
import { PopupContainer } from "./components/popup/popup.container";
import { User } from "./types/User";
import { setUser } from "./state/api/userSlice";
import { TopBarContainer } from "./components/topbar/topbar.container";
import { Router } from "./Router";

function App() {
  const loggedInUser = useSelector((state: RootState) => state.app.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cachedUser = User.getUserFromCookie();
    if (cachedUser) {
      dispatch(setUser(cachedUser));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <PopupContainer />
      {loggedInUser ? (
        <>
          <TopBarContainer />
          <Router />
        </>
      ) : (
        <LoginContainer />
      )}
    </div>
  );
}

export default App;
